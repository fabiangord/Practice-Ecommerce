import { BaseRouter } from '../config/base-router'
import { CustomerController } from '../controllers/customer'

export class CustomerRouter extends BaseRouter {
  constructor(private readonly controller: CustomerController = new CustomerController()) {
    super()
  }

  public routes(): void {
    this.router.get('/customer', async (req, res) => await this.controller.find(req, res))

    this.router.get('/customer/:id', async (req, res) => await this.controller.findOne(req, res))

    this.router.post('/customer', async (req, res) => await this.controller.create(req, res))

    this.router.patch('/customer/:id', async (req, res) => await this.controller.update(req, res))

    this.router.delete('/customer', async (req, res) => await this.controller.delete(req, res))
  }
}
