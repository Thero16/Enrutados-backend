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
    // Primero verificamos la autenticación usando el JwtAuthGuard
    const isAuthorized = await super.canActivate(context);
    if (!isAuthorized) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const publicacionId = request.params.id;

    try {
      // Obtener la publicación con la relación de usuario
      const publicacion = await this.publicacionService.findOne(publicacionId);

      if (!publicacion) {
        throw new UnauthorizedException('Publicación no encontrada');
      }

      // Verificar que la publicación tenga un usuario asociado
      if (!publicacion.usuario) {
        throw new UnauthorizedException('Publicación no tiene usuario asociado');
      }

      // Comparar los IDs
      const isOwner = publicacion.usuario.id === user.id;
      
      if (!isOwner) {
        throw new UnauthorizedException('No tienes permiso para realizar esta acción');
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Error al verificar el propietario de la publicación');
    }
  }
}
