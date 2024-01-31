import { Product } from '@prisma/client'
import { GetProductsOptions } from './types'

export interface FindRepository<T> {
  findOne: (id: string) => Promise<T | null>
  create: (data: T) => Promise<T>
  update: (id: string, data: T) => Promise<T>
  delete: (id: string) => Promise<T>
}

export interface FindPagination {
  findPagination: (options: GetProductsOptions) => Promise<Product[]>
}
