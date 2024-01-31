import { Order_Product } from '@prisma/client'
import { z } from 'zod'

const orderProductSchema = z.object({
  amount: z.number({
    required_error: 'format not correct'
  }),
  order_id: z.string(),
  product_id: z.string()
})

export function validateOrderProductSchema(data: Order_Product): Pick<Order_Product, 'amount' | 'order_id' | 'product_id'> {
  return orderProductSchema.parse(data)
}
