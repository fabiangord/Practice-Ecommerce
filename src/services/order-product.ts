import { Order_Product } from '@prisma/client'
import { Order_ProductRepository } from '../repository/product-order'

export class OrderProductService {
  constructor(private readonly repository: Order_ProductRepository = new Order_ProductRepository()) { }

  async addItem(data: Pick<Order_Product, 'amount' | 'order_id' | 'product_id'>): Promise<Order_Product> {
    return await this.repository.addItem(data)
  }
}
