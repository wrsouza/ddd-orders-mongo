import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  OrderDocument,
  Order as OrderMongo,
} from '../../data/database/schemas/order.schema';
import { Order } from '../domain-models/order';
import { OrderMapper } from '../domain-models/order.mapper';

export class OrderRepository {
  private readonly mapper: OrderMapper;

  constructor(
    @InjectModel(OrderMongo.name)
    private model: Model<OrderDocument>,
  ) {
    this.mapper = new OrderMapper();
  }

  async saveOrder(order: Order): Promise<void> {
    const record = this.mapper.toPersistence(order);
    const model = new this.model(record);
    await model.save();
  }

  async findOrder(where: FilterQuery<OrderDocument>): Promise<Order> {
    const record = await this.model.findOne(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
