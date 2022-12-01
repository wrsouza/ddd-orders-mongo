import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerMapper } from '../../../domain-models/customer.mapper';
import { CustomerDetailsQuery } from './customer-details.query';
import { CustomerDetailsResponse } from './customer-details.response';
import {
  Customer as CustomerMongo,
  CustomerDocument,
} from '../../../../data/database/schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@QueryHandler(CustomerDetailsQuery)
export class CustomerDetailsHandler
  implements IQueryHandler<CustomerDetailsQuery>
{
  private readonly mapper: CustomerMapper;

  constructor(
    @InjectModel(CustomerMongo.name)
    private model: Model<CustomerDocument>,
  ) {
    this.mapper = new CustomerMapper();
  }

  async execute({
    id,
  }: CustomerDetailsQuery): Promise<CustomerDetailsResponse> {
    const record = await this.model.findOne({ _id: id });
    if (!record) {
      throw new NotFoundException('customer not found');
    }
    const customer = this.mapper.toDomain(record);
    return new CustomerDetailsResponse(customer);
  }
}
