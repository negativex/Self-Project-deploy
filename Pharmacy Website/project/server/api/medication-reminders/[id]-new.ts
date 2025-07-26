import { verifyAccessToken } from '~/lib/auth'
import { getReminderById, updateReminder, deleteReminder } from '~/lib/temp-reminders.js'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
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

    if (method === 'PUT') {
      // Update reminder
      const body = await readBody(event)
      const { medicationName, dosage, frequency, timeSlots, notes, isActive } = body

      if (!medicationName || !frequency) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Medication name and frequency are required'
        })
      }

      // Validate frequency
      const validFrequencies = ['daily', 'twice-daily', 'weekly', 'monthly', 'as-needed']
      if (!validFrequencies.includes(frequency)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid frequency'
        })
      }

      const reminder = updateReminder(reminderId, decoded.userId, {
        medicationName,
        dosage: dosage || null,
        frequency,
        timeSlots: JSON.stringify(timeSlots || []),
        notes: notes || null,
        isActive: isActive !== undefined ? isActive : true
      })

      if (!reminder) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Reminder not found'
        })
      }

      return {
        success: true,
        reminder: {
          ...reminder,
          timeSlots: JSON.parse(reminder.timeSlots || '[]')
        }
      }

    } else if (method === 'DELETE') {
      // Delete reminder
      const deleted = deleteReminder(reminderId, decoded.userId)

      if (!deleted) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Reminder not found'
        })
      }

      return {
        success: true,
        message: 'Reminder deleted successfully'
      }

    } else if (method === 'GET') {
      // Get single reminder
      const reminder = getReminderById(reminderId, decoded.userId)

      if (!reminder) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Reminder not found'
        })
      }

      return {
        reminder: {
          ...reminder,
          timeSlots: JSON.parse(reminder.timeSlots || '[]')
        }
      }

    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
    }

  } catch (error: any) {
    console.error('Error processing medication reminder:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to process medication reminder'
    })
  }
})
