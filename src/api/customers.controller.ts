import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCustomerCommand,
  CreateCustomerRequest,
  CreateCustomerResponse,
  UpdateCustomerCommand,
  UpdateCustomerParams,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from '../customers-context/application/commands';
import {
  CustomerDetailsQuery,
  CustomerDetailsRequest,
  CustomerDetailsResponse,
} from '../customers-context/application/queries';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createCustomer(
    @Body() createCustomerRequest: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    const command = new CreateCustomerCommand(createCustomerRequest);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async customerDetails(
    @Param() { id }: CustomerDetailsRequest,
  ): Promise<CustomerDetailsResponse> {
    const query = new CustomerDetailsQuery(id);
    return this.queryBus.execute(query);
  }

  @Put(':id')
  async updateCustomer(
    @Param() { id }: UpdateCustomerParams,
    @Body() updateCustomerRequest: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> {
    const command = new UpdateCustomerCommand(id, updateCustomerRequest);
    return this.commandBus.execute(command);
  }
}
