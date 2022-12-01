import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CustomersModule } from './customers-context/customers.module';
import { DatabaseModule } from './data/database/database.module';
import { ProductsModule } from './products-context/products.module';
import { UsersModule } from './users-context/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    CustomersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
