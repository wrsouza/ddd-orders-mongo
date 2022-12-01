import { IMapper } from '../../common/domain-models';
import { Product as ProductMongo } from '../../data/database/schemas/product.schema';
import { Category } from './category';
import { CategoryId } from './category-id';
import { Product } from './product';
import { ProductId } from './product-id';

export class ProductMapper implements IMapper<Product, ProductMongo> {
  toPersistence(entity: Product): ProductMongo {
    return {
      _id: entity.id.value,
      name: entity.name,
      sku: entity.sku,
      slug: entity.slug,
      price: entity.price,
      stock: entity.stock,
      categories: entity.categories.map((category) => ({
        _id: category.id.value,
        name: category.name,
        slug: category.slug,
      })),
    };
  }

  toDomain(record: ProductMongo): Product {
    const id = new ProductId(record._id);
    return new Product({
      id,
      name: record.name,
      sku: record.sku,
      slug: record.slug,
      price: record.price,
      stock: record.stock,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      categories: record.categories.map(
        (category) =>
          new Category({
            id: new CategoryId(category._id),
            name: category.name,
            slug: category.slug,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          }),
      ),
    });
  }
}
