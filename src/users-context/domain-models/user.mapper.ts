import { IMapper } from '../../common/domain-models';
import { User as UserMongo } from '../../data/database/schemas/user.schema';
import { User } from './user';
import { UserId } from './user-id';

export class UserMapper implements IMapper<User, UserMongo> {
  toPersistence(entity: User): UserMongo {
    return {
      _id: entity.id.value,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      isAdmin: entity.isAdmin,
    };
  }

  toDomain(record: UserMongo): User {
    const id = new UserId(record._id);
    return new User({
      id,
      name: record.name,
      email: record.email,
      password: record.password,
      isAdmin: record.isAdmin,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
