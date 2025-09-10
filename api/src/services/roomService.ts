import { prisma } from '../lib/db'

import { RoomData } from '../types/roomTypes'

export default {
  createRoom: async (data: {
    cost: number
    space: number
    photo: string
    location: string
    description: string
    createdById: number
  }) => {
    return prisma.room.create({ data })
  },

  listRooms: async () => {
    return prisma.room.findMany({
      include: { createdBy: true, users: true },
    })
  },

  editRoom: async (roomId: number, data: Partial<RoomData>) => {
    return prisma.room.update({
      where: { id: roomId },
      data,
    })
  },

  deleteRoom: async (roomId: number) => {
    return prisma.room.delete({
      where: { id: roomId },
    })
  },
}
