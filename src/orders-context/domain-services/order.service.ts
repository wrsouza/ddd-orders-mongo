import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../customers-context/domain-models/customer';
import { CustomerRepository } from '../../customers-context/infrastructure/customer.repository';
import { Product } from '../../products-context/domain-models/product';
import { ProductRepository } from '../../products-context/infrastructure/product.repository';
import { CreateOrderRequest } from '../application/commands/create-order/create-order.request';
import { Order } from '../domain-models/order';
import { OrderAddress } from '../domain-models/order-address';
import { OrderCustomer } from '../domain-models/order-customer';
import { OrderId } from '../domain-models/order-id';
import { OrderItem } from '../domain-models/order-item';
import { OrderItemId } from '../domain-models/order-item-id';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const customerDomain = await this.findCustomer(orderData.customerId);
    const customer = this.setOrderCustomer(customerDomain);
    const address = this.setOrderAddress(customerDomain);

    const items = await this.getOrderItems(orderData);
    const subtotal = this.getSubTotal(items);
    const discount = this.getDiscount(items);
    const total = subtotal - discount + orderData.shipmentValue;

    return new Order({
      id: new OrderId(),
      subtotal,
      discount,
      shipmentType: orderData.shipmentType,
      shipmentValue: orderData.shipmentValue,
      total,
      customer,
      address,
      items,
    });
  }

  setOrderCustomer(customer: Customer): OrderCustomer {
    return new OrderCustomer({
      name: customer.name,
      documentNumber: customer.documentNumber,
      customerId: customer.id.value,
    });
  }

  setOrderAddress(customer: Customer): OrderAddress {
    return new OrderAddress({
      postalCode: customer.address.postalCode,
      lineAddress: customer.address.lineAddress,
      city: customer.address.city,
      state: customer.address.state,
    });
  }

  getSubTotal(items: OrderItem[]): number {
    return items.reduce(
      (previousValue, item) => previousValue + item.price * item.quantity,
      0,
    );
  }

  getDiscount(items: OrderItem[]): number {
    return items.reduce(
      (previousValue, item) => previousValue + item.discount,
      0,
    );
  }

  async getOrderItems(orderData: CreateOrderRequest): Promise<OrderItem[]> {
    const items: OrderItem[] = [];
    for (const item of orderData.items) {
      const product = await this.findProduct(item.productId);
      if (!product) {
        throw new NotFoundException(`product ${item.productId} not found`);
      }
      items.push(
        new OrderItem({
          id: new OrderItemId(),
          name: product.name,
          sku: product.sku,
          quantity: item.quantity,
          price: product.price,
          discount: item.discount,
          productId: product.id.value,
        }),
      );
    }
    return items;
  }

  async findProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findProduct({ _id: id });
    if (!product) {
      throw new NotFoundException(`product ${id} not found`);
    }
    return product;
  }

  async findCustomer(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findCustomer({ _id: id });
    if (!customer) {
      throw new NotFoundException(`customer ${id} not found`);
    }
    return customer;
  }
}
