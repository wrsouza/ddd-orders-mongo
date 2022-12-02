import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class OrderDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
