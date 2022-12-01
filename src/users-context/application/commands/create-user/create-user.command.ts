import { ICommand } from '@nestjs/cqrs';
import { CreateUserRequest } from './create-user.request';

export class CreateUserCommand implements ICommand {
  constructor(readonly createUser: CreateUserRequest) {}
}
