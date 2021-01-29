import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: User) {
    const currentUser = await this.validateUser(user.email, user.password);
    const payload = {
      email: currentUser.email,
      id: currentUser.id,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      alias: currentUser.alias,
      role: currentUser.role,
      customers: currentUser.customers,
    };

    if ((await this.validateUser(user.email, user.password)) !== null) {
      const access_token = this.jwtService.sign(payload);
      this.usersService.tempToken = access_token;
      return { access_token };
    } else {
      throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
