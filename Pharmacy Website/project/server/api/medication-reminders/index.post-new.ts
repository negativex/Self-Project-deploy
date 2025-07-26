import { verifyAccessToken } from '~/lib/auth'
import { addReminder, calculateNextReminder } from '~/lib/temp-reminders.js'

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

    const body = await readBody(event)
    const { medicationName, dosage, frequency, timeSlots, notes } = body

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

    // Validate time slots
    if (timeSlots && !Array.isArray(timeSlots)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Time slots must be an array'
      })
    }

    const nextReminder = calculateNextReminder(frequency, timeSlots || [])

    // Create the medication reminder using temporary storage
    const reminder = addReminder({
      medicationName,
      dosage: dosage || null,
      frequency,
      timeSlots: JSON.stringify(timeSlots || []),
      notes: notes || null,
      isActive: true,
      nextReminder,
      userId: decoded.userId
    })

    return {
      success: true,
      reminder: {
        ...reminder,
        timeSlots: JSON.parse(reminder.timeSlots)
      }
    }

  } catch (error: any) {
    console.error('Error creating medication reminder:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create medication reminder'
    })
  }
})
