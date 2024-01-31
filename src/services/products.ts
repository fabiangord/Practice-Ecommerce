
import { ProductRepository } from '../repository/products'
import { GetProductsOptions, ProductCreate, ProductFormatCurrency } from '../types/types'
import { formatCurrency } from '../libs/formatCurrency'

export class ProductService {
  constructor(private readonly repository: ProductRepository = new ProductRepository()) { }

  async findPagination(options: GetProductsOptions): Promise<ProductFormatCurrency[]> {
    const data = await this.repository.findPagination(options)

    if (data === null) throw new Error('dont products')

    return data.map((product) => {
      return {
        ...product,
        price: formatCurrency(product.price, 'COP')
      }
    })
  }

  async findOne(id: string): Promise<ProductFormatCurrency | null> {
    const data = await this.repository.findOne(id)

    if (data === null) throw new Error('dont exist this product')

    return {
      ...data,
      price: formatCurrency(data.price, 'COP')
    }
  }

  async create(dataRequest: unknown): Promise<ProductFormatCurrency> {
    const data = dataRequest as ProductCreate

    const find = await this.repository.findForName(data.image)

    if (find !== null) throw new Error('product exist')

    const dataCreated = await this.repository.create(data)

    return {
      ...dataCreated,
      price: formatCurrency(data.price, 'COP')
    }
  }

  async update(id: string, data: Omit<ProductCreate, 'id'>): Promise<ProductFormatCurrency> {
    const find = await this.findOne(id)

    if (find === null) throw new Error('product dont exist')

    const dataUpdated = await this.repository.update(id, data)

    return {
      ...dataUpdated,
      price: formatCurrency(dataUpdated.price, 'COP')
    }
  }

  async delete(id: string): Promise<ProductFormatCurrency> {
    const deleted = await this.findOne(id)

    if (deleted === null) throw new Error('User dont exist')

    const dataDeleted = await this.repository.delete(id)

    return {
      ...dataDeleted,
      price: formatCurrency(dataDeleted.price, 'COP')
    }
  }
}
