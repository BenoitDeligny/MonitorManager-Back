import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Monitor } from './monitor.entity';
import { MonitorsService } from './monitors.service';

@Controller('monitors')
export class MonitorsController {
  constructor(private monitorsService: MonitorsService) {}

  @Post()
  createMonitor(@Body() monitor: Monitor) {
    return this.monitorsService.createMonitor(monitor);
  }

  @Get()
  findAll() {
    return this.monitorsService.findAll();
  }

  @Put()
  updateMonitor(@Body() monitor: Monitor) {
    return this.monitorsService.updateMonitor(monitor);
  }

  @Delete(':id')
  removeMonitor(@Param('id') id: number) {
    return this.monitorsService.removeMonitor(id);
  }
}
