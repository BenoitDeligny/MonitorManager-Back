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
import { Monitor } from './monitor.entity';
import { MonitorsService } from './monitors.service';
@UseGuards(JwtAuthGuard)
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
