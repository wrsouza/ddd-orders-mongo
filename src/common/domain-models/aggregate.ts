import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from './entity';
import { Identity } from './identity';

export abstract class Aggregate<DomainId extends Identity>
  extends AggregateRoot
  implements IEntity<DomainId>
{
  protected _id: DomainId;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  public get id(): DomainId {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
