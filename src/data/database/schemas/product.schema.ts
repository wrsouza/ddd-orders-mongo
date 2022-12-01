import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';
import { IdentifiableSchema } from './identifiable.schema';

@Schema({ collection: 'products', timestamps: true })
export class Product extends IdentifiableSchema {
  @Prop({ maxlength: 200 })
  name: string;

  @Prop({ maxlength: 40 })
  sku: string;

  @Prop({ maxlength: 255 })
  slug: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({
    type: [{ type: String, ref: Category.name }],
  })
  categories: Category[];
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
