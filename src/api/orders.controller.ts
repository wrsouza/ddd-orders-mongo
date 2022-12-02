import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderCommand } from '../orders-context/application/commands/create-order/create-order.command';
import { CreateOrderRequest } from '../orders-context/application/commands/create-order/create-order.request';
import { CreateOrderResponse } from '../orders-context/application/commands/create-order/create-order.response';
import {
  OrderDetailsQuery,
  OrderDetailsRequest,
  OrderDetailsResponse,
} from '../orders-context/application/queries';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderRequest: CreateOrderRequest,
  ): Promise<CreateOrderResponse> {
    const command = new CreateOrderCommand(createOrderRequest);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async orderDetails(
    @Param() { id }: OrderDetailsRequest,
  ): Promise<OrderDetailsResponse> {
    const query = new OrderDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
