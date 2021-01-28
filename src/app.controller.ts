import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // ! Mise en place du @UseGuards(LocalAuthGuard) à titre d'exemple pour l'interdiction d'une route
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
