import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NovoProjeto')
  .setDescription('NovoProjeto Api')
  .setVersion('1.0')
  .addTag('Users')
  .addTag('Categories')
  .addTag('Products')
  .addTag('Customers')
  .addTag('Orders')
  .build();
