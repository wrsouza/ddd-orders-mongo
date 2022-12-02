import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedLogEvent } from './order-created-log.event';

@EventsHandler(OrderCreatedLogEvent)
export class OrderCreatedLogHandler
  implements IEventHandler<OrderCreatedLogEvent>
{
  handle({ order }: OrderCreatedLogEvent) {
    Logger.log(`Order ${order.id.value} was created`);
  }
}
