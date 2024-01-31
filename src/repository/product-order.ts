import { Order_Product } from '@prisma/client'
import { prisma } from '../config/db'
import { randomUUID } from 'crypto'

export class Order_ProductRepository {
  async addItem(data: Pick<Order_Product, 'amount' | 'order_id' | 'product_id'>): Promise<Order_Product> {
    return await prisma.order_Product.create({
      data: {
        id: randomUUID(),
        amount: data.amount,
        order_id: data.order_id,
        product_id: data.product_id
      }
    })
  }
}
