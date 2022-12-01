import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedLogEvent } from './user-created-log.event';

@EventsHandler(UserCreatedLogEvent)
export class UserCreatedLogHandler
  implements IEventHandler<UserCreatedLogEvent>
{
  handle({ user }: UserCreatedLogEvent) {
    Logger.log(`User ${user.id.value} was created`);
  }
}
