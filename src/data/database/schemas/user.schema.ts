import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IdentifiableSchema } from './identifiable.schema';

@Schema({ collection: 'users', timestamps: true })
export class User extends IdentifiableSchema {
  @Prop({ maxlength: 100 })
  name: string;

  @Prop({ maxlength: 255 })
  email: string;

  @Prop({ maxlength: 255 })
  password: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
