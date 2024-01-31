import { Request, Response } from 'express'
import { errorHandler } from '../libs/error'
import { CustomerService } from '../services/customer'
import { Customer } from '@prisma/client'
import { validateIdParamas } from '../schemas/id'
import { validateCustomerSchema } from '../schemas/customer'

export class CustomerController {
  constructor(private readonly service: CustomerService = new CustomerService()) { }

  async find(_req: Request, res: Response): Promise<Response<Customer[]> | string | Response<Error>> {
    try {
      const customer = await this.service.find()

      return res.json(customer)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response<Customer> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const customer = await this.service.findOne(id)

      return res.json(customer)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async create(req: Request, res: Response): Promise<Response<Customer> | string | Response<Error>> {
    try {
      const customer = validateCustomerSchema(req.body)

      const customerCreated = await this.service.create(customer)

      return res.json(customerCreated)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async update(req: Request, res: Response): Promise<Response<Customer> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const customer = validateCustomerSchema(req.body)

      const customerUpdated = await this.service.update(id, customer)

      return res.json(customerUpdated)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async delete(req: Request, res: Response): Promise<Response<Customer> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const customer = await this.service.delete(id)

      return res.json(customer)
    } catch (error) {
      return errorHandler(error, res)
    }
  }
}
