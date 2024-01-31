import { z } from 'zod'
import { ProductCreate } from '../types/types'

const productSchema = z.object({
  name: z.string({
    required_error: 'name format incorrect'
  }).min(2).max(50),
  image: z.string({
    required_error: 'image format incorrect'
  }).url(),
  description: z.string({
    required_error: 'description format invalid'
  }).max(100, { message: 'only 100 characters' }),
  price: z.number(),
  category: z.string({
    required_error: 'category format invalid'
  }).min(3).max(10)
})

export function validateProductSchema(data: ProductCreate): Omit<ProductCreate, 'id'> {
  return productSchema.parse(data)
}
