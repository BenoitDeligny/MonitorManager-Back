import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/shared/entities/roles/roles.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private saltOrRound = 10;
  public tempToken = '';

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: User): Promise<User> {
    if (await this.findOne(user.email)) {
      throw new HttpException(
        'This email already exist !',
        HttpStatus.CONFLICT,
      );
    } else {
      const basicRole = await this.roleService.findById(3);
      user.role = basicRole;

      user.password = await bcrypt.hash(user.password, this.saltOrRound);
      return this.usersRepository.save(user);
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneByAlias(alias: string): Promise<User> {
    return this.usersRepository.findOne({ alias });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async updateUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
