import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from './monitor.entity';

@Injectable()
export class MonitorsService {
  constructor(
    @InjectRepository(Monitor)
    private monitorsRepository: Repository<Monitor>,
  ) {}

  createMonitor(monitor: Monitor): Promise<Monitor> {
    return this.monitorsRepository.save(monitor);
  }

  findAll(): Promise<Monitor[]> {
    return this.monitorsRepository.find();
  }

  async updateMonitor(monitor: Monitor): Promise<Monitor> {
    return this.monitorsRepository.save(monitor);
  }

  async removeMonitor(id: number): Promise<void> {
    await this.monitorsRepository.delete(id);
  }
}
