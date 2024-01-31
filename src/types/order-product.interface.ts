import { Order } from '@prisma/client'

export interface OrderRepositoryInterface {
  find: () => Promise<Order[]>
  findForUser: (id: string) => Promise<Order[]>
  findOne: (id: string) => Promise<Order | null>
  create: (data: unknown) => Promise<Order>
  updateStatus: (id: string, data: Order) => Promise<Order>
}
