import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductMapper } from '../../../domain-models/product.mapper';
import { ProductDetailsQuery } from './product-details.query';
import { ProductDetailsResponse } from './product-details.response';
import {
  Product as ProductMongo,
  ProductDocument,
} from '../../../../data/database/schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@QueryHandler(ProductDetailsQuery)
export class ProductDetailsHandler
  implements IQueryHandler<ProductDetailsQuery>
{
  private readonly mapper: ProductMapper;

  constructor(
    @InjectModel(ProductMongo.name)
    private model: Model<ProductDocument>,
  ) {
    this.mapper = new ProductMapper();
  }

  async execute({ id }: ProductDetailsQuery): Promise<ProductDetailsResponse> {
    const record = await this.model.findOne({ _id: id });
    if (!record) {
      throw new NotFoundException('product not found');
    }
    const product = this.mapper.toDomain(record);
    return new ProductDetailsResponse(product);
  }
}
