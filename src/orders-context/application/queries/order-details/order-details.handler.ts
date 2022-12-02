import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Order as OrderMongo,
  OrderDocument,
} from '../../../../data/database/schemas/order.schema';
import { OrderMapper } from '../../../domain-models/order.mapper';
import { OrderDetailsQuery } from './order-details.query';
import { OrderDetailsResponse } from './order-details.response';

@QueryHandler(OrderDetailsQuery)
export class OrderDetailsHandler implements IQueryHandler<OrderDetailsQuery> {
  private readonly mapper: OrderMapper;

  constructor(
    @InjectModel(OrderMongo.name)
    private model: Model<OrderDocument>,
  ) {
    this.mapper = new OrderMapper();
  }

  async execute({ id }: OrderDetailsQuery): Promise<OrderDetailsResponse> {
    const record = await this.model.findOne({ _id: id });
    if (!record) {
      throw new NotFoundException('order not found');
    }
    const order = this.mapper.toDomain(record);
    return new OrderDetailsResponse(order);
  }
}
