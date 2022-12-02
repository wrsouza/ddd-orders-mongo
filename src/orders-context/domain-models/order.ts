import { Aggregate } from '../../common/domain-models';
import {
  Order as OrderMongo,
  ShipmentTypeEnum,
} from '../../data/database/schemas/order.schema';
import { OrderAddress } from './order-address';
import { OrderCustomer } from './order-customer';
import { OrderId } from './order-id';
import { OrderItem } from './order-item';

export interface IOrderValues {
  id?: OrderId;
  subtotal: number;
  shipmentType: ShipmentTypeEnum;
  shipmentValue: number;
  discount: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  address: OrderAddress;
  customer: OrderCustomer;
  items: OrderItem[];
}

export class Order extends Aggregate<OrderId> {
  private _subtotal: number;
  private _shipmentType: ShipmentTypeEnum;
  private _shipmentValue: number;
  private _discount: number;
  private _total: number;
  private _address: OrderAddress;
  private _customer: OrderCustomer;
  private _items: OrderItem[];

  constructor(order: IOrderValues) {
    super();
    this._id = order.id;
    this._subtotal = order.subtotal;
    this._shipmentType = order.shipmentType;
    this._shipmentValue = order.shipmentValue;
    this._discount = order.discount;
    this._total = order.total;
    this._createdAt = order.createdAt;
    this._updatedAt = order.updatedAt;
    this._address = order.address;
    this._customer = order.customer;
    this._items = order.items;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  get shipmentType(): ShipmentTypeEnum {
    return this._shipmentType;
  }

  get shipmentValue(): number {
    return this._shipmentValue;
  }

  get discount(): number {
    return this._discount;
  }

  get total(): number {
    return this._total;
  }

  get address(): OrderAddress {
    return this._address;
  }

  get customer(): OrderCustomer {
    return this._customer;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  update(order: Partial<OrderMongo>) {
    if (order.subtotal) {
      this._subtotal = order.subtotal;
    }
    if (order.shipmentType) {
      this._shipmentType = order.shipmentType;
    }
    if (order.shipmentValue) {
      this._shipmentValue = order.shipmentValue;
    }
    if (order.discount) {
      this._discount = order.discount;
    }
    if (order.total) {
      this._total = order.total;
    }
    if (order.address) {
      this._address.update(order.address);
    }
    if (order.customer) {
      this._customer.update(order.customer);
    }
  }
}
