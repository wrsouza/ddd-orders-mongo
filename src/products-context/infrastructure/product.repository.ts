import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from '../../data/database/schemas/user.schema';
import { Product } from '../domain-models/product';
import { ProductMapper } from '../domain-models/product.mapper';
import {
  Product as ProductMongo,
  ProductDocument,
} from '../../data/database/schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';

export class ProductRepository {
  private readonly mapper: ProductMapper;

  constructor(
    @InjectModel(ProductMongo.name)
    private model: Model<ProductDocument>,
  ) {
    this.mapper = new ProductMapper();
  }

  async saveProduct(product: Product): Promise<void> {
    const record = this.mapper.toPersistence(product);
    const model = new this.model(record);
    await model.save();
  }

  async findProduct(where: FilterQuery<UserDocument>): Promise<Product> {
    const record = await this.model.findOne(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
