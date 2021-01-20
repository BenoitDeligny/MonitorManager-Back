import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  createCustomer(customer: Customer) {
    return this.customersRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async findOneById(id: number): Promise<Customer> {
    return this.customersRepository.findOne(id);
  }

  async findOneByName(name: string): Promise<Customer> {
    return this.customersRepository.findOne(name);
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
