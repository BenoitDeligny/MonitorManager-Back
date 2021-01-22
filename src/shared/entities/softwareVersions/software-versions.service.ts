import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoftwareVersion } from './software-version.entity';

@Injectable()
export class SoftwareVersionsService {
  constructor(
    @InjectRepository(SoftwareVersion)
    private softwareVersionsRepository: Repository<SoftwareVersion>,
  ) {}

  createSoftwareVersion(version: SoftwareVersion) {
    return this.softwareVersionsRepository.save(version);
  }

  findAll(): Promise<SoftwareVersion[]> {
    return this.softwareVersionsRepository.find();
  }

  async updateVersion(version: SoftwareVersion): Promise<SoftwareVersion> {
    return this.softwareVersionsRepository.save(version);
  }

  async removeVersion(id: number): Promise<void> {
    await this.softwareVersionsRepository.delete(id);
  }
}
