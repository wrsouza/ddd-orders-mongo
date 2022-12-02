import { Entity } from '../../common/domain-models';
import { OrderItem as OrderItemMongo } from '../../data/database/schemas/order.schema';
import { OrderItemId } from './order-item-id';

export interface IOrderItemValues {
  id: OrderItemId;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
  productId?: string;
}

export class OrderItem extends Entity<OrderItemId> {
  private _name: string;
  private _sku: string;
  private _quantity: number;
  private _price: number;
  private _discount: number;
  private _productId: string;

  constructor(orderItem: IOrderItemValues) {
    super();
    this._id = orderItem.id;
    this._name = orderItem.name;
    this._sku = orderItem.sku;
    this._quantity = orderItem.quantity;
    this._price = orderItem.price;
    this._discount = orderItem.discount;
    this._createdAt = orderItem.createdAt;
    this._updatedAt = orderItem.updatedAt;
    this._productId = orderItem.productId;
  }

  get name(): string {
    return this._name;
  }

  get sku(): string {
    return this._sku;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get discount(): number {
    return this._discount;
  }

  get productId(): string {
    return this._productId;
  }

  update(item: Partial<OrderItemMongo>) {
    if (item.name) {
      this._name = item.name;
    }
    if (item.sku) {
      this._sku = item.sku;
    }
    if (item.quantity) {
      this._quantity = item.quantity;
    }
    if (item.price) {
      this._price = item.price;
    }
    if (item.discount) {
      this._discount = item.discount;
    }
    if (item.productId) {
      this._productId = item.productId;
    }
  }
}
