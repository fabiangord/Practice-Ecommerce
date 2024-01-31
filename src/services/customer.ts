import { Customer } from '@prisma/client'
import { CustomerRepository } from '../repository/customer'
import { CustomerType } from '../types/types'
import { FindForEmail } from '../libs/findForEmail'

export class CustomerService {
  constructor(private readonly repository: CustomerRepository = new CustomerRepository(),
    private readonly findForEmailCase: FindForEmail = new FindForEmail()) { }

  async find(): Promise<Customer[]> {
    return await this.repository.find()
  }

  async findOne(id: string): Promise<Customer | null> {
    const customer = await this.repository.findOne(id)

    if (customer === null) throw new Error("customer don't exist")

    return customer
  }

  async create(customerRequest: unknown): Promise<Customer> {
    const customer = customerRequest as CustomerType

    const find = await this.findForEmailCase.findForEmail(customer.user.email)

    if (find) throw new Error('user exist')

    return await this.repository.create(customer)
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    const dataToUpdated = await this.findOne(id)

    if (dataToUpdated === null) throw new Error('customer not found')

    return await this.repository.update(id, data)
  }

  async delete(id: string): Promise<Customer> {
    const dataToDelete = await this.findOne(id)

    if (dataToDelete === null) throw new Error('customer not found for eliminate')

    return await this.repository.delete(id)
  }
}
