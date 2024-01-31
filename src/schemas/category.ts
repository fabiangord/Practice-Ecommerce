import { Category } from '@prisma/client'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string({
    required_error: 'name format incorrect'
  }).min(2).max(20),
  image: z.string({
    required_error: 'image format incorrect'
  }).url()
})

export function validateCategorySchema(data: Partial<Category>): Partial<Category> {
  return categorySchema.parse(data)
}
