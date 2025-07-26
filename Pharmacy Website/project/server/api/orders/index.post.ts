import prisma from '~/lib/prisma'
import { verifyAccessToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  try {
    // Get and verify JWT token
    const authorization = getCookie(event, 'auth-token') || getHeader(event, 'authorization')
    
    if (!authorization) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required'
      })
    }

    const token = authorization.replace('Bearer ', '')
    const decoded = verifyAccessToken(token)
    
    if (!decoded || !decoded.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }

    // Get order data from request body
    const orderData = await readBody(event)
    
    if (!orderData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Order data is required'
      })
    }

    // Validate required fields
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Order items are required'
      })
    }

    if (!orderData.shipping) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Shipping information is required'
      })
    }

    // Validate that all products exist
    const productIds = orderData.items.map((item: any) => item.id)
    const existingProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      select: {
        id: true,
        name: true,
        price: true
      }
    })

    // Check if all products exist
    const missingProducts = productIds.filter((id: string) => !existingProducts.find(p => p.id === id))
    if (missingProducts.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Products not found: ${missingProducts.join(', ')}`
      })
    }

    // Generate order number if not provided
    const orderNumber = orderData.orderNumber || 'MDP-' + Date.now() + '-' + Math.floor(Math.random() * 1000)

    // Calculate totals
    const subtotal = orderData.subtotal || orderData.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const shippingFee = orderData.shippingFee || 0
    const taxAmount = orderData.tax || subtotal * 0.08 // 8% tax
    const totalAmount = orderData.total || subtotal + shippingFee + taxAmount

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: decoded.userId,
        status: 'PENDING',
        totalAmount,
        taxAmount,
        shippingFee,
        shippingAddress: JSON.stringify(orderData.shipping || orderData.shippingAddress),
        billingAddress: JSON.stringify(orderData.billing || orderData.billingAddress),
        paymentMethod: orderData.paymentMethod || 'credit-card',
        paymentStatus: 'PENDING',
        // Create order items
        orderItems: {
          create: orderData.items?.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
          })) || []
        }
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                manufacturer: true
              }
            }
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    // Return success response
    return {
      success: true,
      order,
      message: 'Order created successfully'
    }

  } catch (error: any) {
    console.error('Error creating order:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create order'
    })
  }
})
