import { Users } from '@prisma/client'
import { prisma } from '../config/db'
import { randomUUID } from 'crypto'
import { FindRepository } from '../types/interfaces'

export class UserRepository implements FindRepository<Users> {
  async find(): Promise<Users[]> {
    return await prisma.users.findMany({
      include: {
        Customer: true
      }
    })
  }

  async findOne(id: string): Promise<Users | null> {
    return await prisma.users.findUnique({
      where: {
        id
      },
      include: {
        Customer: true
      }
    })
  }

  async create(userRequest: unknown): Promise<Users> {
    const user = userRequest as Pick<Users, 'email' | 'password'>

    return await prisma.users.create({
      data: {
        id: randomUUID(),
        email: user.email,
        password: user.password,
        role: 'CUSTOMER'
      }
    })
  }

  async delete(id: string): Promise<Users> {
    const find = await this.findOne(id)

    if (find === null) {
      throw new Error("User don't exist")
    }

    return await prisma.users.delete({
      where: {
        id
      }
    })
  }

  async update(id: string, data: Partial<Users>): Promise<Users> {
    return await prisma.users.update({
      where: {
        id
      },
      data: {
        email: data.email,
        password: data.password
      }
    })
  }
}
