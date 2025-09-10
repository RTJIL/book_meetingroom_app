import { prisma } from '../lib/db'

export default {
  bookRoom: async (data: {
    roomId: number
    userId: number
    startTime: Date
    endTime: Date
    description?: string
  }) => {
    try {
      return await prisma.booking.create({ data })
    } catch (err) {
      if (err instanceof Error) console.error(err.message)
    }
  },
}
