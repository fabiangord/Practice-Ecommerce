import { Request, Response } from 'express'
import { errorHandler } from '../libs/error'
import { ProductService } from '../services/products'
import { Product } from '@prisma/client'
import { GetProductsOptions } from '../types/types'
import { validateIdParamas } from '../schemas/id'
import { validateProductSchema } from '../schemas/products'

export class ProductController {
  constructor(private readonly service: ProductService = new ProductService()) { }

  async find(req: Request, res: Response): Promise<Response<Product[]> | string | Response<Error>> {
    try {
      const paginationParamas: GetProductsOptions = req.query

      const products = await this.service.findPagination({ take: Number(paginationParamas.take), skip: Number(paginationParamas.skip) })

      return res.json(products)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response<Product> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const products = await this.service.findOne(id)

      return res.json(products)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async create(req: Request, res: Response): Promise<Response<Product> | string | Response<Error>> {
    try {
      const product = validateProductSchema(req.body)

      const products = await this.service.create(product)

      return res.json(products)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async update(req: Request, res: Response): Promise<Response<Product> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const data = validateProductSchema(req.body)

      const products = await this.service.update(id, data)

      return res.json(products)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async delete(req: Request, res: Response): Promise<Response<Product[]> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const products = await this.service.delete(id)

      return res.json(products)
    } catch (error) {
      return errorHandler(error, res)
    }
  }
}
