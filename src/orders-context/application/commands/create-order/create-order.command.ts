import { ICommand } from '@nestjs/cqrs';
import { CreateOrderRequest } from './create-order.request';

export class CreateOrderCommand implements ICommand {
  constructor(readonly createOrder: CreateOrderRequest) {}
}
