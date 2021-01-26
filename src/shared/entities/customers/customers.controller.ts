import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  createCustomer(@Body() customer: Customer) {
    return this.customersService.createCustomer(customer);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Put()
  updateCustomer(@Body() customer: Customer) {
    return this.customersService.updateCustomer(customer);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}
