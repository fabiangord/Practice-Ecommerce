import { BaseRouter } from '../config/base-router'
import { ProductController } from '../controllers/product'

export class ProductRouter extends BaseRouter {
  constructor(private readonly controller: ProductController = new ProductController()) {
    super()
  }

  public routes(): void {
    this.router.get('/products', async (req, res) => await this.controller.find(req, res))

    this.router.get('/products/:id', async (req, res) => await this.controller.findOne(req, res))

    this.router.post('/products', async (req, res) => await this.controller.create(req, res))

    this.router.patch('/products', async (req, res) => await this.controller.update(req, res))

    this.router.get('/products', async (req, res) => await this.controller.delete(req, res))
  }
}
