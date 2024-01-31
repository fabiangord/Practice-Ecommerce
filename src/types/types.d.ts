import { Users } from '@prisma/client'

export type CustomerType = {
  id: string
  name: string
  lastname: string
  phone: string
  user: Users
}

export type ProductCreate = {
  id: string
  name: string
  image: string
  description: string
  price: number
  category: string
}

export type GetProductsOptions = Partial<{
  take?: number
  skip?: number
}>

export type ProductFormatCurrency = {
  id: string
  name: string
  image: string
  description: string
  price: string
  categoryId: string
  createdAt: Date
}
