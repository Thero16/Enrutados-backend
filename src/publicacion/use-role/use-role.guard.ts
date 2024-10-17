import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UseRoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extrae el token del header

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const decoded = this.jwtService.verify(token);
      // Aquí puedes verificar los roles que tienes en tu payload JWT
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (roles && !roles.includes(decoded.role)) {
        throw new UnauthorizedException('No tienes permiso para acceder');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o caducado');
    }
  }
}
