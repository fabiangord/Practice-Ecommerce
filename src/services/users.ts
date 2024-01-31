import { Users } from '@prisma/client'
import { UserRepository } from '../repository/users'
import { FindForEmail } from '../libs/findForEmail'

export class UserService {
  constructor(private readonly repository: UserRepository = new UserRepository(),
    private readonly findForEmail: FindForEmail = new FindForEmail()) { }

  async find(): Promise<Users[]> {
    const user = await this.repository.find()

    if (user.length < 0) throw new Error('dont users')

    return user
  }

  async findOne(id: string): Promise<Users | null> {
    const user = await this.repository.findOne(id)

    if (user === null) throw new Error('No se encuentra el usuario')

    return user
  }

  async create(userRequest: unknown): Promise<Users> {
    const user = userRequest as Pick<Users, 'email' | 'password'>

    const find = await this.findForEmail.findForEmail(user.email)

    if (find !== null) throw new Error('user exist')

    return await this.repository.create(user)
  }

  async delete(id: string): Promise<Users> {
    const find = await this.findOne(id)

    if (find === null) {
      throw new Error("User don't exist")
    }

    return await this.repository.delete(id)
  }

  async update(id: string, data: Partial<Users>): Promise<Users> {
    const find = await this.findOne(id)

    if (find === null) throw new Error('user dont exist')

    return await this.repository.update(id, data)
  }
}
