import { BaseRouter } from '../config/base-router'
import { UserController } from '../controllers/users'

export class UsersRoutes extends BaseRouter {
  constructor(private readonly controller: UserController = new UserController()) {
    super()
  }

  public routes(): void {
    this.router.get('/users', async (req, res) => await this.controller.find(req, res))

    this.router.get('/users/:id', async (req, res) => await this.controller.findOne(req, res))

    this.router.post('/users', async (req, res) => await this.controller.create(req, res))

    this.router.patch('/users/:id', async (req, res) => await this.controller.upsert(req, res))

    this.router.delete('/users/:id', async (req, res) => await this.controller.delete(req, res))
  }
}
