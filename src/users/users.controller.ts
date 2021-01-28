import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Get('alias/:alias')
  findOneByAlias(@Param('alias') alias: string) {
    return this.usersService.findOneByAlias(alias);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Put()
  updateUser(@Body() user: User) {
    return this.usersService.updateUser(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
