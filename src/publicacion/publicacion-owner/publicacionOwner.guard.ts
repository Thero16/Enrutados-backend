import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from 'src/usuario/strategy/jwt-auth.guard';
import { PublicacionService } from 'src/publicacion/publicacion.service';

@Injectable()
export class PublicacionOwnerGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private publicacionService: PublicacionService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    const publicacionId = request.params.id; 
    const publicacion = await this.publicacionService.findOne(publicacionId);

    if (!publicacion) {
      throw new UnauthorizedException('No puedes hacer ese cambio')
    }

    return publicacion.usuario.id === user.id;
  }
}
