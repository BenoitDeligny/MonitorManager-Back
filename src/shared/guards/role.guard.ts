import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const currentHeader = context.getArgByIndex(0);
    const userToken = currentHeader.headers.authorization.slice(7);
    const decryptToken = this.jwtService.decode(userToken);
    if (decryptToken['role']['name'] === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
