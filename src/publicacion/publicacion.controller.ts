import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, RequestTimeoutException } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/usuario/decorators/getUser.decorator';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { PublicacionOwnerGuard } from './publicacion-owner/publicacionOwner.guard';

@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createPublicacionDto: CreatePublicacionDto, @getUser() usuario: Usuario) {
   
    return this.publicacionService.create(createPublicacionDto, usuario);
  }

  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionService.findOne(id);
  }

 
  @Patch(':id')
  @UseGuards(AuthGuard(), PublicacionOwnerGuard)
  update(@Param('id') id: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
    return this.publicacionService.update(id, updatePublicacionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), PublicacionOwnerGuard)
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
}
