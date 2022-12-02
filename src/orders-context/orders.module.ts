import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from '../api/orders.controller';
import { CustomersModule } from '../customers-context/customers.module';
import { Order, OrderSchema } from '../data/database/schemas/order.schema';
import { ProductsModule } from '../products-context/products.module';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { OrderService } from './domain-services/order.service';
import { OrderRepository } from './infrastructure/order.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CustomersModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    OrderRepository,
    OrderService,
  ],
})
export class OrdersModule {}
