import { Product } from '@prisma/client'
import { prisma } from '../config/db'
import { randomUUID } from 'crypto'
import { GetProductsOptions, ProductCreate } from '../types/types'
import { FindPagination, FindRepository } from '../types/interfaces'

export class ProductRepository implements FindRepository<Product>, FindPagination {
  async findPagination(options: GetProductsOptions): Promise<Product[]> {
    return await prisma.product.findMany({
      ...(options.take ? { take: options.take } : {}),
      ...(options.skip ? { skip: options.skip } : {}),
      include: { category: true }
    })
  }

  async findForName(name: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        name
      }
    })
  }

  async findOne(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  async create(dataRequest: unknown): Promise<Product> {
    const data = dataRequest as ProductCreate

    return await prisma.product.create({
      data: {
        id: randomUUID(),
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        category: {
          connect: {
            name: data.category
          }
        }
      },
      include: {
        category: true
      }
    })
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return await prisma.product.update({
      where: {
        id
      },
      data: {
        name: data.name,
        image: data.image,
        price: data.price,
        description: data.description
      }
    })
  }

  async delete(id: string): Promise<Product> {
    return await prisma.product.delete({
      where: {
        id
      }
    })
  }
}
