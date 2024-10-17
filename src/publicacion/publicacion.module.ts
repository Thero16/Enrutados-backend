import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [PublicacionController],
  providers: [PublicacionService],
  imports: [TypeOrmModule.forFeature([Publicacion]), UsuarioModule],
})
export class PublicacionModule {}
