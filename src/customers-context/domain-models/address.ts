import { ValueObject } from '../../common/domain-models';
import { Address as AddressMongo } from '../../data/database/schemas/customer.schema';

export interface IAddressValues {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}

export class Address extends ValueObject {
  private _postalCode: string;
  private _lineAddress: string;
  private _city: string;
  private _state: string;

  constructor(address: IAddressValues) {
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

  update(address: Partial<AddressMongo>) {
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
