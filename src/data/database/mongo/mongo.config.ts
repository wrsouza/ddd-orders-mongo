import { ConfigService } from '@nestjs/config';

export const mongoAsyncConfig = {
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('CONNECTION_STRING'),
  }),
  inject: [ConfigService],
};
