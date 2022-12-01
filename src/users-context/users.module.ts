import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../api/users.controller';
import { User, UserSchema } from '../data/database/schemas/user.schema';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UserRepository,
  ],
})
export class UsersModule {}
