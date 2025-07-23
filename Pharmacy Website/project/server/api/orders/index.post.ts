import prisma from '~/lib/prisma'
import { verifyAccessToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    // Get authorization header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required'
      })
    }

    // Verify token and get user info
    const token = authHeader.split(' ')[1]
    const decoded = await verifyAccessToken(token)
    
    if (!decoded || !decoded.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
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

    // Generate order number if not provided
    const orderNumber = orderData.orderNumber || 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000)

    // Calculate totals
    const subtotal = orderData.items?.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) || orderData.subtotal || 0
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
