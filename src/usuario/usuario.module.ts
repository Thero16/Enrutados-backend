import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([Usuario]),
  PassportModule.register({defaultStrategy: 'jwt'}),
JwtModule.registerAsync({
  imports: [],
  inject: [],
  useFactory: async()=>{
    return {
      secret: process.env.SECRET_PASSWORD,
      signOptions: {expiresIn:'1d'},
    }
  }

})],
  exports: [PassportModule, JwtModule, JwtStrategy, TypeOrmModule]
})
export class UsuarioModule {}
