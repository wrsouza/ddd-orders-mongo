import { Prop } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export abstract class IdentifiableSchema {
  @Prop({ type: String, default: uuid })
  _id: string;
}
