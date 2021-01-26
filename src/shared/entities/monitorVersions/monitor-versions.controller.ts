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
import { MonitorVersion } from './monitor-version.entity';
import { MonitorVersionsService } from './monitor-versions.service';
@UseGuards(JwtAuthGuard)
@Controller('monitor-versions')
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
