import { ValueObject } from '../../common/domain-models';
import { OrderAddress as OrderAddressMongo } from '../../data/database/schemas/order.schema';

export interface IOrderAddressValues {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}

export class OrderAddress extends ValueObject {
  private _postalCode: string;
  private _lineAddress: string;
  private _city: string;
  private _state: string;

  constructor(address: IOrderAddressValues) {
    super();
    this._postalCode = address.postalCode;
    this._lineAddress = address.lineAddress;
    this._city = address.city;
    this._state = address.state;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get lineAddress(): string {
    return this._lineAddress;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  update(address: Partial<OrderAddressMongo>) {
    if (address.postalCode) {
      this._postalCode = address.postalCode;
    }
    if (address.lineAddress) {
      this._lineAddress = address.lineAddress;
    }
    if (address.city) {
      this._city = address.city;
    }
    if (address.state) {
      this._state = address.state;
    }
  }
}
