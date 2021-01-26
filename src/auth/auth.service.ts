import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private saltOrRound = 10;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    if ((await this.validateUser(user.email, user.password)) !== null) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
