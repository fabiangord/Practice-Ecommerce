import { Request, Response } from 'express'
import { errorHandler } from '../libs/error'
import { Order_Product } from '@prisma/client'
import { validateOrderProductSchema } from '../schemas/order-product'
import { OrderProductService } from '../services/order-product'

export class OrderProductController {
  constructor(private readonly service: OrderProductService = new OrderProductService()) { }

  async addItem(req: Request, res: Response): Promise<Response<Order_Product> | string | Response<Error>> {
    try {
      const dataItem = validateOrderProductSchema(req.body)

      const data = await this.service.addItem(dataItem)

      return res.json(data)
    } catch (error) {
      return errorHandler(error, res)
    }
  }
}
