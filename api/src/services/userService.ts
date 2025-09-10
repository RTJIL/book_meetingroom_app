import { prisma } from '../lib/db'

export default {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } })
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({ where: { id } })
  },
}
