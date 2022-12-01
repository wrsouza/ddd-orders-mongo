import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IdentifiableSchema } from './identifiable.schema';

@Schema({ collection: 'categories', timestamps: true })
export class Category extends IdentifiableSchema {
  @Prop({ maxlength: 200 })
  name: string;

  @Prop({ maxlength: 255 })
  slug: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
