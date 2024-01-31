import { z } from 'zod'
import { Customer } from '@prisma/client'

const customerSchema = z.object({
  name: z.string({
    required_error: 'name format invalid'
  }),
  lastname: z.string({
    required_error: 'lastname format invalid'
  }),
  phone: z.string({
    required_error: 'phone format invalid'
  }),
  user: z.object({
    email: z.string().email({
      message: 'email is invalid'
    }),
    password: z.string().min(5, {
      message: 'password min 5 characters'
    })
  })
})

export function validateCustomerSchema(data: Customer): Partial<Customer> {
  return customerSchema.parse(data)
}
