import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from '../api/customers.controller';
import {
  Customer,
  CustomerSchema,
} from '../data/database/schemas/customer.schema';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { CustomerRepository } from './infrastructure/customer.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    CustomerRepository,
  ],
  exports: [CustomerRepository],
})
export class CustomersModule {}
