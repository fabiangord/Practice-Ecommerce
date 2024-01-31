import { Customer } from '@prisma/client'
import { prisma } from '../config/db'
import { randomUUID } from 'crypto'
import { CustomerType } from '../types/types'
import { FindRepository } from '../types/interfaces'

export class CustomerRepository implements FindRepository<Customer> {
  async find(): Promise<Customer[]> {
    return await prisma.customer.findMany({
      include: {
        user: true
      }
    })
  }

  async findOne(id: string): Promise<Customer | null> {
    return await prisma.customer.findUnique({
      where: {
        id
      },
      include: {
        user: true
      }
    })
  }

  async create(customerRequest: unknown): Promise<Customer> {
    const customer = customerRequest as CustomerType

    return await prisma.customer.create({
      data: {
        id: randomUUID(),
        name: customer.name,
        lastname: customer.lastname,
        phone: customer.phone,
        user: {
          create: {
            id: randomUUID(),
            email: customer.user.email,
            password: customer.user.password,
            role: 'CUSTOMER'
          }
        }
      }
    })
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    return await prisma.customer.update({
      where: {
        id
      },
      data: {
        name: data.name,
        lastname: data.lastname,
        phone: data.phone
      }
    })
  }

  async delete(id: string): Promise<Customer> {
    return await prisma.customer.delete({
      where: {
        id
      }
    })
  }
}
