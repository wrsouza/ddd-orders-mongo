import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
