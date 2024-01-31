import { Request, Response } from 'express'
import { UserService } from '../services/users'
import { Users } from '@prisma/client'
import { errorHandler } from '../libs/error'
import { validateIdParamas } from '../schemas/id'
import { validateUserSchema } from '../schemas/users'

export class UserController {
  constructor(
    private readonly service = new UserService()
  ) { }

  async find(_req: Request, res: Response): Promise<Response<Users[]> | string | Response<Error>> {
    try {
      const users = await this.service.find()
      return res.json(users)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response<Users> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const user = await this.service.findOne(id)
      return res.json(user)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async create(req: Request, res: Response): Promise<Response<Users> | string | Response<Error>> {
    try {
      const { email, password } = validateUserSchema(req.body)

      const createUser = await this.service.create({ email, password })

      return res.json(createUser)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async delete(req: Request, res: Response): Promise<Response<Users> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const userDelete = await this.service.delete(id)

      return res.json(userDelete)
    } catch (error) {
      return errorHandler(error, res)
    }
  }

  async upsert(req: Request, res: Response): Promise<Response<Users> | string | Response<Error>> {
    try {
      const { id } = validateIdParamas(req.params.id)

      const user = validateUserSchema(req.body)

      const upsert = await this.service.update(id, user)
      return res.json(upsert)
    } catch (error) {
      return errorHandler(error, res)
    }
  }
}
