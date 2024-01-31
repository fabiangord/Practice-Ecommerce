import { BaseRouter } from '../config/base-router'
import { CategoryController } from '../controllers/category'

export class CategoryRouter extends BaseRouter {
  constructor(private readonly controller: CategoryController = new CategoryController()) {
    super()
  }

  public routes(): void {
    this.router.get('/category', async (req, res) => await this.controller.find(req, res))

    this.router.get('/category/:id', async (req, res) => await this.controller.findOne(req, res))

    this.router.post('/category', async (req, res) => await this.controller.create(req, res))

    this.router.patch('/category/:id', async (req, res) => await this.controller.update(req, res))

    this.router.delete('/category', async (req, res) => await this.controller.delete(req, res))
  }
}
