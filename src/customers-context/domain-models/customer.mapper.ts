import { IMapper } from '../../common/domain-models';
import { Address } from './address';
import { Customer } from './customer';
import { CustomerId } from './customer-id';
import { Customer as CustomerMongo } from '../../data/database/schemas/customer.schema';

export class CustomerMapper implements IMapper<Customer, CustomerMongo> {
  toPersistence(entity: Customer): CustomerMongo {
    return {
      _id: entity.id.value,
      name: entity.name,
      documentNumber: entity.documentNumber,
      address: {
        postalCode: entity.address.postalCode,
        lineAddress: entity.address.lineAddress,
        city: entity.address.city,
        state: entity.address.state,
      },
    };
  }

  toDomain(record: CustomerMongo): Customer {
    const id = new CustomerId(record._id);
    return new Customer({
      id,
      name: record.name,
      documentNumber: record.documentNumber,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      address: new Address({
        postalCode: record.address.postalCode,
        lineAddress: record.address.lineAddress,
        city: record.address.city,
        state: record.address.state,
      }),
    });
  }
}
