import { Category } from '@prisma/client'
import { Request, Response } from 'express'
import { errorHandler } from '../libs/error'
import { CategoryService } from '../services/category'
import { validateIdParamas } from '../schemas/id'
import { validateCategorySchema } from '../schemas/category'

export class CategoryController {
  constructor(private readonly service: CategoryService = new CategoryService()) { }

  async find(_req: Request, res: Response): Promise<Response<Category[]> | string | Response<Error>> {
    try {
      const categorys = await this.service.find()
      return res.json(categorys)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response<Category> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const category = await this.service.findOne(id)

      return res.json(category)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async create(req: Request, res: Response): Promise<Response<Category> | string | Response<Error>> {
    try {
      const category = validateCategorySchema(req.body)

      const categosySaved = await this.service.create(category)

      return res.json(categosySaved)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async update(req: Request, res: Response): Promise<Response<Category> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const data = validateCategorySchema(req.body)

      const categoryUpdated = await this.service.update(id, data)

      return res.json(categoryUpdated)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async delete(req: Request, res: Response): Promise<Response<Category> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const categoryDeleted = await this.service.delete(id)

      return res.json(categoryDeleted)
    } catch (error) {
      return errorHandler(error, res)
    }
  }
}
