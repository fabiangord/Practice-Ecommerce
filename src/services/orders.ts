import { Order } from '@prisma/client'
import { OrderRepository } from '../repository/orders'

export class OrderService {
  constructor(private readonly repository: OrderRepository = new OrderRepository()) { }

  async find(): Promise<Order[]> {
    const findData = await this.repository.find()

    if (findData.length < 1) throw new Error('dont orders')

    return findData
  }

  async findForUser(id: string): Promise<Order[]> {
    const dataOrder = await this.repository.findForUser(id)

    if (dataOrder.length < 1) throw new Error('dont orders for user')

    return dataOrder
  }

  async findOne(id: string): Promise<Order | null> {
    const dataOrder = await this.repository.findOne(id)

    if (dataOrder === null) throw new Error('dont exist order')

    return dataOrder
  }

  async create(dataRequest: unknown): Promise<Order> {
    const newOrder = await this.repository.create(dataRequest)

    return newOrder
  }

  async updateStatus(id: string): Promise<Order> {
    return await this.repository.updateStatus(id)
  }
}
