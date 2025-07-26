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

    const reminderId = getRouterParam(event, 'id')
    
    if (event.node.req.method === 'PATCH') {
      // Update reminder
      const body = await readBody(event)
      
      const reminder = await prisma.medicationReminder.update({
        where: {
          id: reminderId,
          userId: decoded.userId // Ensure user can only update their own reminders
        },
        data: {
          ...body,
          timeSlots: body.timeSlots ? JSON.stringify(body.timeSlots) : undefined,
          updatedAt: new Date()
        }
      })

      return {
        success: true,
        reminder: {
          ...reminder,
          timeSlots: reminder.timeSlots ? JSON.parse(reminder.timeSlots) : []
        }
      }
    }
    
    if (event.node.req.method === 'DELETE') {
      // Delete reminder
      await prisma.medicationReminder.delete({
        where: {
          id: reminderId,
          userId: decoded.userId // Ensure user can only delete their own reminders
        }
      })

      return {
        success: true,
        message: 'Reminder deleted successfully'
      }
    }

    if (event.node.req.method === 'GET') {
      // Get specific reminder
      const reminder = await prisma.medicationReminder.findFirst({
        where: {
          id: reminderId,
          userId: decoded.userId
        }
      })

      if (!reminder) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Reminder not found'
        })
      }

      return {
        reminder: {
          ...reminder,
          timeSlots: reminder.timeSlots ? JSON.parse(reminder.timeSlots) : []
        }
      }
    }

  } catch (error) {
    console.error('Error handling medication reminder:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to handle medication reminder'
    })
  }
})
