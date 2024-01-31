import { Category } from '@prisma/client'
import { CategoryRepository } from '../repository/category'

export class CategoryService {
  constructor(private readonly repository: CategoryRepository = new CategoryRepository()) { }

  async find(): Promise<Category[]> {
    return await this.repository.find()
  }

  async findOne(id: string): Promise<Category | null> {
    const category = await this.repository.findOne(id)

    if (category === null) throw new Error('dont exist category')

    return category
  }

  async create(dataRequest: unknown): Promise<Category> {
    const categoryRequest = dataRequest as Category

    const categoryFinded = await this.repository.findForName(categoryRequest.name)

    if (categoryFinded !== null) throw new Error('category exist')

    return await this.repository.create(categoryRequest)
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const dataToUpdated = await this.findOne(id)

    if (dataToUpdated === null) throw new Error('category not found')

    return await this.repository.update(id, data)
  }

  async delete(id: string): Promise<Category> {
    const find = await this.findOne(id)

    if (find === null) throw new Error('user dont exist')

    return await this.repository.delete(id)
  }
}
