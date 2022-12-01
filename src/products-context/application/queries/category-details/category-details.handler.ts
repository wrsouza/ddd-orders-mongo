import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryMapper } from '../../../domain-models/category.mapper';
import { CategoryDetailsQuery } from './category-details.query';
import { CategoryDetailsResponse } from './category-details.response';
import {
  Category as CategoryMongo,
  CategoryDocument,
} from '../../../../data/database/schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@QueryHandler(CategoryDetailsQuery)
export class CategoryDetailsHandler
  implements IQueryHandler<CategoryDetailsQuery>
{
  private readonly mapper: CategoryMapper;

  constructor(
    @InjectModel(CategoryMongo.name)
    private model: Model<CategoryDocument>,
  ) {
    this.mapper = new CategoryMapper();
  }

  async execute({
    id,
  }: CategoryDetailsQuery): Promise<CategoryDetailsResponse> {
    const record = await this.model.findOne({ _id: id });
    if (!record) {
      throw new NotFoundException('category not found');
    }
    const category = this.mapper.toDomain(record);
    return new CategoryDetailsResponse(category);
  }
}
