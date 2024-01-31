import { Users } from '@prisma/client'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email({
    message: 'email is invalid'
  }),
  password: z.string().min(5, {
    message: 'password min 5 characters'
  })
})

export function validateUserSchema(data: Users): Partial<Users> {
  return userSchema.parse(data)
}
