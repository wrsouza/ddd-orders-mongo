import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  User as UserMongo,
  UserDocument,
} from '../../data/database/schemas/user.schema';
import { User } from '../domain-models/user';
import { UserMapper } from '../domain-models/user.mapper';

export class UserRepository {
  private readonly mapper: UserMapper;

  constructor(
    @InjectModel(UserMongo.name)
    private model: Model<UserDocument>,
  ) {
    this.mapper = new UserMapper();
  }

  async saveUser(user: User): Promise<void> {
    const record = this.mapper.toPersistence(user);
    const model = new this.model(record);
    await model.save();
  }

  async findUser(where: FilterQuery<UserDocument>): Promise<User> {
    const record = await this.model.findOne(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
