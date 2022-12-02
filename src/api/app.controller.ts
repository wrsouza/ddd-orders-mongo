import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller()
export class AppController {
  @Get('/')
  get() {
    return HttpStatus.OK;
  }

  @Get('healthcheck')
  healthcheck() {
    return HttpStatus.OK;
  }
}
