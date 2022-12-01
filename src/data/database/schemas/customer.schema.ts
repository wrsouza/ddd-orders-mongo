import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IdentifiableSchema } from './identifiable.schema';

export class Address {
  @Prop({ maxlength: 8 })
  postalCode: string;

  @Prop({ maxlength: 255 })
  lineAddress: string;

  @Prop({ maxlength: 100 })
  city: string;

  @Prop({ maxlength: 2 })
  state: string;
}

@Schema({ collection: 'customers', timestamps: true })
export class Customer extends IdentifiableSchema {
  @Prop({ maxlength: 100 })
  name: string;

  @Prop({ maxlength: 14 })
  documentNumber: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: Address })
  address: Address;
}

export type CustomerDocument = HydratedDocument<Customer>;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
