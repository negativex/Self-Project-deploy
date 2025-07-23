import prisma from '~/lib/prisma'
import { verifyAccessToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
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

    // Get query parameters for filtering
    const query = getQuery(event)
    const { status, limit = 50, offset = 0 } = query

    // Build where clause for user-specific orders
    const whereClause = {
      userId: decoded.userId
    }

    // Add status filter if provided
    if (status && status !== 'all') {
      whereClause.status = status
    }

    // Fetch user's orders only
    const orders = await prisma.order.findMany({
      where: whereClause,
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
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    })

    // Get total count for pagination
    const totalCount = await prisma.order.count({
      where: whereClause
    })

    return {
      success: true,
      data: orders,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasNext: parseInt(offset) + parseInt(limit) < totalCount,
        hasPrev: parseInt(offset) > 0
      }
    }

  } catch (error: any) {
    console.error('Error fetching orders:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch orders'
    })
  }
})
