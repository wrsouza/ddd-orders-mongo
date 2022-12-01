import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductCommand,
  CreateProductRequest,
  CreateProductResponse,
} from '../products-context/application/commands';
import {
  ProductDetailsQuery,
  ProductDetailsRequest,
  ProductDetailsResponse,
} from '../products-context/application/queries';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const command = new CreateProductCommand(createProductRequest);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async productDetails(
    @Param() { id }: ProductDetailsRequest,
  ): Promise<ProductDetailsResponse> {
    const query = new ProductDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
