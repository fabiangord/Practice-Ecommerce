import { Users } from '@prisma/client'
import { prisma } from '../config/db'

export class FindForEmail {
  async findForEmail(email: string): Promise<Users | null> {
    return await prisma.users.findUnique({
      where: {
        email
      }
    })
  }
}
