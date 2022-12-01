import { IQuery } from '@nestjs/cqrs';

export class UserDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
