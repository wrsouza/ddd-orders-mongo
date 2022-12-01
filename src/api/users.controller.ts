import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserCommand,
  CreateUserRequest,
  CreateUserResponse,
} from '../users-context/application/commands';
import {
  UserDetailsQuery,
  UserDetailsRequest,
  UserDetailsResponse,
} from '../users-context/application/queries';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const command = new CreateUserCommand(createUserRequest);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async userDetails(
    @Param() { id }: UserDetailsRequest,
  ): Promise<UserDetailsResponse> {
    const query = new UserDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
