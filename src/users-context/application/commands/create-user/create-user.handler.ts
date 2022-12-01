import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/user.repository';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponse } from './create-user.response';
import { User } from '../../../domain-models/user';
import { UserId } from '../../../domain-models/user-id';
import { UserCreatedLogEvent } from '../../events/user-created-log/user-created-log.event';
import { hashSync } from 'bcrypt';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createUser,
  }: CreateUserCommand): Promise<CreateUserResponse> {
    const { email } = createUser;
    await this.userExists(email);

    const user = new User({
      ...createUser,
      id: new UserId(),
      password: hashSync(createUser.password, 8),
      isAdmin: false,
    });
    await this.repository.saveUser(user);

    const event = new UserCreatedLogEvent(user);
    this.eventBus.publish(event);

    return new CreateUserResponse(user);
  }

  async userExists(email: string): Promise<void> {
    const user = await this.repository.findUser({ email });
    if (user) {
      throw new BadRequestException('user already exists.');
    }
  }
}
