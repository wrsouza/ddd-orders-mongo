import { ApiProperty } from '@nestjs/swagger';
import { ShipmentTypeEnum } from '../../../../data/database/schemas/order.schema';
import { Order } from '../../../domain-models/order';

class AddressDetailsReponse {
  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  lineAddress: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

class CustomerDetailsResponse {
  @ApiProperty()
  customerId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  documentNumber: string;
}

export class OrderItemResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  productId?: string;
}

export class OrderDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  shipmentType: ShipmentTypeEnum;

  @ApiProperty()
  shipmentValue: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    type: CustomerDetailsResponse,
  })
  customer: CustomerDetailsResponse;

  @ApiProperty({
    type: AddressDetailsReponse,
  })
  address: AddressDetailsReponse;

  @ApiProperty({
    type: [OrderItemResponse],
  })
  items: OrderItemResponse[];

  constructor(order: Order) {
    this.id = order.id.value;
    this.subtotal = order.subtotal;
    this.shipmentType = order.shipmentType;
    this.shipmentValue = order.shipmentValue;
    this.discount = order.discount;
    this.total = order.total;
    this.createdAt = order.createdAt;

    const { customer } = order;
    this.customer = {
      customerId: customer.customerId,
      name: customer.name,
      documentNumber: customer.documentNumber,
    };

    const { address } = order;
    this.address = {
      postalCode: address.postalCode,
      lineAddress: address.lineAddress,
      city: address.city,
      state: address.state,
    };

    this.items = order.items.map((item) => ({
      id: item.id.value,
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      createdAt: item.createdAt,
      productId: item.productId,
    }));
  }
}
