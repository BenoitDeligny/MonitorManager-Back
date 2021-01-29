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
import { RoleGuard } from 'src/shared/guards/role.guard';
import { SoftwareVersion } from './software-version.entity';
import { SoftwareVersionsService } from './software-versions.service';
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('software-versions')
export class SoftwareVersionsController {
  constructor(private softwareVersionsService: SoftwareVersionsService) {}

  @Post()
  createVersion(@Body() version: SoftwareVersion) {
    return this.softwareVersionsService.createSoftwareVersion(version);
  }

  @Get()
  findAll() {
    return this.softwareVersionsService.findAll();
  }

  @Put()
  updateVersion(@Body() version: SoftwareVersion) {
    return this.softwareVersionsService.updateVersion(version);
  }

  @Delete(':id')
  deleteVersion(@Param('id') id: number) {
    return this.softwareVersionsService.removeVersion(id);
  }
}
