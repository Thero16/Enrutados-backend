import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Publicacion } from './entities/publicacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class PublicacionService {

  constructor(@InjectRepository(Publicacion) 
  private readonly publicacionRepository: Repository<Publicacion>)
  {  }

  async create(createPublicacionDto: CreatePublicacionDto, usuario: Usuario) {
    const publicacion = await this.publicacionRepository.create(createPublicacionDto);
    console.log(usuario,"servicio")
    await this.publicacionRepository.save({...publicacion, usuario});
    return publicacion;
  }

  async findAll() {
    return this.publicacionRepository.find({
      relations: ['usuario']
    });
  }
  
  async findOne(id: string): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id },
      relations: ['usuario'], // Esto es importante para cargar la relación
    });

    if (!publicacion) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }

    return publicacion;
  }
  

  async update(id: string, updatePublicacionDto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionRepository.preload({id: id, ...updatePublicacionDto})
    
    if(!publicacion){
      throw new NotFoundException('No se ha encontrado la publicacion')
    }
    await this.publicacionRepository.save(publicacion);
    return publicacion;
  }

  async remove(id: string) {
    const publicacion = await this.publicacionRepository.delete({id:id});
    return publicacion;
  }
}
