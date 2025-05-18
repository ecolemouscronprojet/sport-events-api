// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

export function RolesGuard(...allowedRoles: string[]) {
  @Injectable()
  class RoleGuard implements CanActivate {
    constructor(public jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });

        request['user'] = payload;

        const userRole = payload.role;

        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
          throw new ForbiddenException(`Access denied for role: ${userRole}`);
        }

        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    public extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  return RoleGuard;
}