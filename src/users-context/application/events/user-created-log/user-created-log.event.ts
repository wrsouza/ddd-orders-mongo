import { IEvent } from '@nestjs/cqrs';
import { User } from '../../../domain-models/user';

export class UserCreatedLogEvent implements IEvent {
  constructor(readonly user: User) {}
}
