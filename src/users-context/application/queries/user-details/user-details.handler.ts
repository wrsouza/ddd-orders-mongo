import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User as UserMongo,
  UserDocument,
} from '../../../../data/database/schemas/user.schema';
import { UserMapper } from '../../../domain-models/user.mapper';
import { UserDetailsQuery } from './user-details.query';
import { UserDetailsResponse } from './user-details.response';

@QueryHandler(UserDetailsQuery)
export class UserDetailsHandler implements IQueryHandler<UserDetailsQuery> {
  private readonly mapper: UserMapper;

  constructor(
    @InjectModel(UserMongo.name)
    private model: Model<UserDocument>,
  ) {
    this.mapper = new UserMapper();
  }

  async execute({ id }: UserDetailsQuery): Promise<UserDetailsResponse> {
    const record = await this.model.findOne({ _id: id });
    if (!record) {
      throw new NotFoundException('user not found');
    }
    const user = this.mapper.toDomain(record);
    return new UserDetailsResponse(user);
  }
}
