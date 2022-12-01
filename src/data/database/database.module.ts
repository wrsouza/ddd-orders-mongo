import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoAsyncConfig } from './mongo/mongo.config';

@Module({
  imports: [MongooseModule.forRootAsync(mongoAsyncConfig)],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
