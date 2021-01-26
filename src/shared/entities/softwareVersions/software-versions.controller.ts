import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SoftwareVersion } from './software-version.entity';
import { SoftwareVersionsService } from './software-versions.service';

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
