import { Order } from '@prisma/client'
import { prisma } from '../config/db'
import { randomUUID } from 'crypto'
import { OrderRepositoryInterface } from '../types/order-product.interface'

export class OrderRepository implements OrderRepositoryInterface {
  async find(): Promise<Order[]> {
    return await prisma.order.findMany({})
  }

  async findForUser(id: string): Promise<Order[]> {
    return await prisma.order.findMany({
      where: {
        customer: {
          id
        }
      },
      include: {
        Order_Product: {
          include: {
            product: true
          }
        },
        customer: true
      }
    })
  }

  async findOne(id: string): Promise<Order | null> {
    return await prisma.order.findUnique({
      where: {
        id
      },
      include: {
        Order_Product: true
      }
    })
  }

  async create(dataRequest: unknown): Promise<Order> {
    const id = dataRequest as string

    return await prisma.order.create({
      data: {
        id: randomUUID(),
        customer_id: id,
        status: 'PROCESSING'
      }
    })
  }

  async updateStatus(id: string): Promise<Order> {
    return await prisma.order.update({
      where: {
        id
      },
      data: {
        status: 'COMPLETE'
      },
      include: {
        Order_Product: true
      }
    })
  }
}
