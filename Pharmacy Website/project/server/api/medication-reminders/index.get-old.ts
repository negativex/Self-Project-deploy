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

    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const isActive = query.isActive === 'true'

    // Build where clause for user's reminders only
    const where: any = {
      userId: decoded.userId
    }

    if (isActive !== undefined) {
      where.isActive = isActive
    }

    // Get user's medication reminders with pagination
    const reminders = await prisma.medicationReminder.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    })

    // Get total count for pagination
    const totalItems = await prisma.medicationReminder.count({
      where
    })

    // Transform reminders to include parsed time slots
    const transformedReminders = reminders.map(reminder => ({
      ...reminder,
      timeSlots: reminder.timeSlots ? JSON.parse(reminder.timeSlots) : []
    }))

    return {
      reminders: transformedReminders,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNext: page * limit < totalItems,
        hasPrev: page > 1
      }
    }
  } catch (error) {
    console.error('Error fetching medication reminders:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch medication reminders'
    })
  }
})
