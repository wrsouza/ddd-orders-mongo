import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from '../api/categories.controller';
import { ProductsController } from '../api/products.controller';
import { EventHandlers } from '../customers-context/application/events/handlers';
import {
  Category,
  CategorySchema,
} from '../data/database/schemas/category.schema';
import {
  Product,
  ProductSchema,
} from '../data/database/schemas/product.schema';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { CategoryRepository } from './infrastructure/category.repository';
import { ProductRepository } from './infrastructure/product.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ProductRepository,
    CategoryRepository,
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
