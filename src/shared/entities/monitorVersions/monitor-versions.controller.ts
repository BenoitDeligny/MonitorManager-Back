import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MonitorVersion } from './monitor-version.entity';
import { MonitorVersionsService } from './monitor-versions.service';

@Controller('monitor-version')
export class MonitorVersionsController {
  constructor(private monitorVersionsService: MonitorVersionsService) {}

  @Post()
  createVersion(@Body() version: MonitorVersion) {
    return this.monitorVersionsService.createMonitorVersion(version);
  }

  @Get()
  findAll() {
    return this.monitorVersionsService.findAll();
  }

  @Put()
  updateVersion(@Body() version: MonitorVersion) {
    return this.monitorVersionsService.updateVersion(version);
  }

  @Delete(':id')
  deleteVersion(@Param('id') id: number) {
    return this.monitorVersionsService.removeVersion(id);
  }
}
