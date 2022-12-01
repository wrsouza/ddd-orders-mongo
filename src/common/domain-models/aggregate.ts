import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from './entity';
import { Identity } from './identity';

export abstract class Aggregate extends AggregateRoot implements IEntity {
  protected _id: Identity;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  public get id(): Identity {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
