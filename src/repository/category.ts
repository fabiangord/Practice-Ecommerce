import { Category } from '@prisma/client'
import { prisma } from '../config/db'
import { randomUUID } from 'crypto'
import { FindRepository } from '../types/interfaces'

export class CategoryRepository implements FindRepository<Category> {
  async find(): Promise<Category[]> {
    return await prisma.category.findMany({
      include: {
        Product: true
      }
    })
  }

  async findOne(id: string): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: {
        id
      },
      include: {
        Product: true
      }
    })
  }

  async create(dataRequest: unknown): Promise<Category> {
    const data = dataRequest as Category

    return await prisma.category.create({
      data: {
        id: randomUUID(),
        name: data.name,
        image: data.image
      }
    })
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    return await prisma.category.update({
      where: {
        id
      },
      data: {
        name: data.name,
        image: data.image
      },
      include: {
        Product: true
      }
    })
  }

  async delete(id: string): Promise<Category> {
    return await prisma.category.delete({
      where: {
        id
      }
    })
  }

  async findForName(name: string): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: {
        name
      }
    })
  }
}
