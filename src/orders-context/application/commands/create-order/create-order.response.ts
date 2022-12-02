import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../../domain-models/order';

export class CreateOrderResponse {
  @ApiProperty()
  id: string;

  constructor(order: Order) {
    this.id = order.id.value;
  }
}
