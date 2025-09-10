import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(2, 'Too short name, at least 2 characters'),
  email: z.email('Wrong format of email'),
  password: z.string().min(6, 'Password is too short, write 6 characters'),
  role: z.enum(['Admin', 'User']).optional(),
})

export const signinSchema = z.object({
  email: z.email('Wrong format of email'),
  password: z.string().min(6, 'Password is too short, write 6 characters'),
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
