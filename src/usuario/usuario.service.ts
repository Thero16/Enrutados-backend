import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(Usuario) 
  private readonly usuarioRepository: Repository<Usuario>,
  private readonly jwtService: JwtService)
  {  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try{
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    usuario.contrasena= await bcrypt.hash(usuario.contrasena, 10);
    await this.usuarioRepository.save(usuario);
    const {nombreCompleto, correoElectronico}= usuario;
    return {usuario: {nombreCompleto, correoElectronico}};
    } catch(err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find({}); 
    return usuarios;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({id:id});
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({id: id, ...updateUsuarioDto})
    return usuario;
  }

  async remove(id: string) {
    const usuario = await this.usuarioRepository.delete({id:id});
    return usuario;
  }

  async login(loginDto: LoginAuthDto) {
    try {
      const { correoElectronico, contrasena } = loginDto;
      const usuario = await this.usuarioRepository.findOneBy({ correoElectronico });
      
      if (!usuario) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      
      const isValid = bcrypt.compareSync(contrasena, usuario.contrasena);
      if (!isValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      
      const { nombreCompleto } = usuario;
      const jwt = this.jwtService.sign({ nombreCompleto, correoElectronico });
      
      // Incluye los datos del usuario junto con el token
      return {
        access_token: jwt,
        usuario: {
          nombreCompleto,
          correoElectronico,
        },
      };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
  }
  
  
}

