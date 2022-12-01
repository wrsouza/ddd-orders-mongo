import { Entity } from '../../common/domain-models';
import { CategoryId } from './category-id';
import { Category as CategoryMongo } from '../../data/database/schemas/category.schema';

export interface ICategoryValues {
  id?: CategoryId;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends Entity {
  private _name: string;
  private _slug: string;

  constructor(category: ICategoryValues) {
    super();
    this._id = category.id;
    this._name = category.name;
    this._slug = category.slug;
    this._createdAt = category.createdAt;
    this._updatedAt = category.updatedAt;
  }

  get name(): string {
    return this._name;
  }

  get slug(): string {
    return this._slug;
  }

  update(category: Partial<CategoryMongo>) {
    if (category.name) {
      this._name = category.name;
    }
    if (category.slug) {
      this._slug = category.slug;
    }
  }
}
