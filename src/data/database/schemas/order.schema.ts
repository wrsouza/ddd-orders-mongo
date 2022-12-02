import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Customer } from './customer.schema';
import { IdentifiableSchema } from './identifiable.schema';
import { Product } from './product.schema';

export enum ShipmentTypeEnum {
  Slow = 0,
  Fast = 1,
  Free = 2,
}

export class OrderAddress {
  @Prop({ maxlength: 8 })
  postalCode: string;

  @Prop({ maxlength: 255 })
  lineAddress: string;

  @Prop({ maxlength: 100 })
  city: string;

  @Prop({ maxlength: 2 })
  state: string;
}

export class OrderCustomer {
  @Prop({ maxlength: 100 })
  name: string;

  @Prop({ maxlength: 14 })
  documentNumber: string;

  @Prop({
    type: { type: String, ref: Customer.name },
    required: false,
  })
  customerId?: string;
}

export class OrderItem extends IdentifiableSchema {
  @Prop({ maxlength: 200 })
  name: string;

  @Prop({ maxlength: 40 })
  sku: string;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({
    type: { type: String, ref: Product.name },
    required: false,
  })
  productId?: string;
}

@Schema({ collection: 'orders', timestamps: true })
export class Order extends IdentifiableSchema {
  @Prop({ default: 0 })
  subtotal: number;

  @Prop()
  shipmentType: ShipmentTypeEnum;

  @Prop({ default: 0 })
  shipmentValue: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ default: 0 })
  total: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({
    type: Array<OrderItem>,
  })
  items: OrderItem[];

  @Prop({
    type: OrderCustomer,
  })
  customer: OrderCustomer;

  @Prop({
    type: OrderAddress,
  })
  address: OrderAddress;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
