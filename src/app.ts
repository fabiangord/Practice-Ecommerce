import express from 'express'
import morgan from 'morgan'
import { ConfigServer } from './config/config'
import { UsersRoutes } from './routes/users'
import { CustomerRouter } from './routes/customer'
import { CategoryRouter } from './routes/category'
import { ProductRouter } from './routes/products'
import { OrderRouter } from './routes/orders'

class Server extends ConfigServer {
  private readonly app: express.Application = express()
  private readonly PORT: Number = this.getEnviromentNumber('PORT')

  constructor() {
    super()
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use('/api', this.routers())
    this.listen()
  }

  private routers(): express.Router[] {
    return [
      new UsersRoutes().router,
      new CustomerRouter().router,
      new CategoryRouter().router,
      new ProductRouter().router,
      new OrderRouter().router
    ]
  }

  private listen(): void {
    this.app.listen(this.PORT, () => {
      console.log('listening on port ', this.PORT)
    })
  }
}

void new Server()
