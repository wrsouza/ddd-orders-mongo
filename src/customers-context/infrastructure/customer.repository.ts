import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Customer as CustomerMongo,
  CustomerDocument,
} from '../../data/database/schemas/customer.schema';
import { Customer } from '../domain-models/customer';
import { CustomerMapper } from '../domain-models/customer.mapper';

export class CustomerRepository {
  private readonly mapper: CustomerMapper;

  constructor(
    @InjectModel(CustomerMongo.name)
    private model: Model<CustomerDocument>,
  ) {
    this.mapper = new CustomerMapper();
  }

  async saveCustomer(customer: Customer): Promise<void> {
    const record = this.mapper.toPersistence(customer);
    const model = new this.model(record);
    await model.save();
  }

  async findCustomer(where: FilterQuery<CustomerDocument>): Promise<Customer> {
    const record = await this.model.findOne(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
