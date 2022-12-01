import { IMapper } from '../../common/domain-models';
import { Category as CategoryMongo } from '../../data/database/schemas/category.schema';
import { Category } from './category';
import { CategoryId } from './category-id';

export class CategoryMapper implements IMapper<Category, CategoryMongo> {
  toPersistence(entity: Category): CategoryMongo {
    return {
      _id: entity.id.value,
      name: entity.name,
      slug: entity.slug,
    };
  }

  toDomain(record: CategoryMongo): Category {
    const id = new CategoryId(record._id);
    return new Category({
      id,
      name: record.name,
      slug: record.slug,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
