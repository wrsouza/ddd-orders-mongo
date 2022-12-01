import { Category } from '../domain-models/category';
import { CategoryMapper } from '../domain-models/category.mapper';
import {
  Category as CategoryMongo,
  CategoryDocument,
} from '../../data/database/schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

export class CategoryRepository {
  private readonly mapper: CategoryMapper;

  constructor(
    @InjectModel(CategoryMongo.name)
    private model: Model<CategoryDocument>,
  ) {
    this.mapper = new CategoryMapper();
  }

  async saveCategory(product: Category): Promise<void> {
    const record = this.mapper.toPersistence(product);
    const model = new this.model(record);
    await model.save();
  }

  async findCategory(where: FilterQuery<CategoryDocument>): Promise<Category> {
    const record = await this.model.findOne(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
