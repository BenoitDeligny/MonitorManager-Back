import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
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
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
