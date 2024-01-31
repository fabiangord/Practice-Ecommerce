import { Order } from '@prisma/client'
import { errorHandler } from '../libs/error'
import { Request, Response } from 'express'
import { OrderService } from '../services/orders'
import { validateIdParamas } from '../schemas/id'

export class OrderController {
  constructor(private readonly service: OrderService = new OrderService()) { }

  async find(_req: Request, res: Response): Promise<Response<Order> | string | Response<Error>> {
    try {
      const orderForUser = this.service.find()

      return res.json(orderForUser)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async findForUser(req: Request, res: Response): Promise<Response<Order> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const orderForUser = this.service.findForUser(id)

      return res.json(orderForUser)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response<Order> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const order = this.service.findOne(id)

      return res.json(order)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async create(req: Request, res: Response): Promise<Response<Order> | string | Response<Error>> {
    try {
      const order = req.body

      const orderCreated = this.service.create(order)

      return res.json(orderCreated)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response<Order> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const orderUpdatedStatus = this.service.updateStatus(id)

      return res.json(orderUpdatedStatus)
    } catch (error) {
      return errorHandler(error, res)
    }
  }
}
