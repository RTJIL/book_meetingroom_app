import { z } from 'zod'

export const createRoomSchema = z.object({
  cost: z.number().positive(),
  space: z.number().positive(),
  photo: z.url(),
  location: z.string(),
  description: z.string(),
})

export type CreateRoomInput= z.infer<typeof createRoomSchema>
