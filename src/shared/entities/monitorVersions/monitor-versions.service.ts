import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorVersion } from './monitor-version.entity';

@Injectable()
export class MonitorVersionsService {
  constructor(
    @InjectRepository(MonitorVersion)
    private monitorVersionsRepository: Repository<MonitorVersion>,
  ) {}

  createMonitorVersion(
    monitorVersion: MonitorVersion,
  ): Promise<MonitorVersion> {
    return this.monitorVersionsRepository.save(monitorVersion);
  }

  findAll(): Promise<MonitorVersion[]> {
    return this.monitorVersionsRepository.find();
  }

  async updateVersion(monitorVersion: MonitorVersion): Promise<MonitorVersion> {
    return this.monitorVersionsRepository.save(monitorVersion);
  }

  async removeVersion(id: number): Promise<void> {
    await this.monitorVersionsRepository.delete(id);
  }
}
