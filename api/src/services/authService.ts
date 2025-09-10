import { prisma } from '../lib/db'
import bcrypt from 'bcrypt'

export default {
  async signUp(
    name: string,
    email: string,
    password: string,
    role: 'Admin' | 'User' = 'User'
  ) {
    const hashed = await bcrypt.hash(password, 10)

    return prisma.user.create({
      data: { name, email, password: hashed, role },
    })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } })
  },
}
