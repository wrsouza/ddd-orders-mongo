import { IQuery } from '@nestjs/cqrs';

export class OrderDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
