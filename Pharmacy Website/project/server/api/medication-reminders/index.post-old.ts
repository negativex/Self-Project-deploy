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

    const body = await readBody(event)
    const { medicationName, dosage, frequency, timeSlots, notes } = body

    if (!medicationName || !frequency) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Medication name and frequency are required'
      })
    }

    // Calculate next reminder time based on frequency and time slots
    const calculateNextReminder = (frequency: string, timeSlots: string[]) => {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      
      if (timeSlots && timeSlots.length > 0) {
        // Find the next time slot today or tomorrow
        for (const timeSlot of timeSlots) {
          const [hours, minutes] = timeSlot.split(':').map(Number)
          const reminderTime = new Date(today.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000)
          
          if (reminderTime > now) {
            return reminderTime
          }
        }
        
        // If no more time slots today, use first time slot tomorrow
        const [hours, minutes] = timeSlots[0].split(':').map(Number)
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
        return new Date(tomorrow.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000)
      }
      
      // Default to tomorrow morning if no time slots specified
      return new Date(today.getTime() + 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000) // 8 AM tomorrow
    }

    const nextReminder = calculateNextReminder(frequency, timeSlots || [])

    // Create the medication reminder
    const reminder = await prisma.medicationReminder.create({
      data: {
        medicationName,
        dosage: dosage || null,
        frequency,
        timeSlots: JSON.stringify(timeSlots || []),
        notes: notes || null,
        isActive: true,
        nextReminder,
        userId: decoded.userId
      }
    })

    return {
      success: true,
      reminder: {
        ...reminder,
        timeSlots: timeSlots || []
      }
    }
  } catch (error) {
    console.error('Error creating medication reminder:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create medication reminder'
    })
  }
})
