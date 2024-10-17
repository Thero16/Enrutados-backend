import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginAuthDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/publicacion/use-role/use-role.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(AuthGuard(),UseRoleGuard)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(),UseRoleGuard)
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(),UseRoleGuard)
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(),UseRoleGuard)
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

  @Post('login')
  login(@Body()loginDto: LoginAuthDto){
    return this.usuarioService.login(loginDto);
  }
}
