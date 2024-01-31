import { BaseRouter } from '../config/base-router'
import { OrderController } from '../controllers/orders'

export class OrderRouter extends BaseRouter {
  constructor(private readonly controller: OrderController = new OrderController()) {
    super()
  }

  public routes(): void {
    this.router.get('/order', async (req, res) => await this.controller.find(req, res))

    this.router.get('/order/:id', async (req, res) => await this.controller.findForUser(req, res))

    this.router.get('/order-one/:id', async (req, res) => await this.controller.findOne(req, res))

    this.router.post('/order', async (req, res) => await this.controller.create(req, res))

    this.router.patch('/order/:id', async (req, res) => await this.controller.updateStatus(req, res))
  }
}
