import { IEvent } from '@nestjs/cqrs';
import { Order } from '../../../domain-models/order';

export class OrderCreatedLogEvent implements IEvent {
  constructor(readonly order: Order) {}
}
