import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity()
export class Publicacion {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    numeroTotalPuestos: number

    @Column('text', {
        nullable:false
    })
    zona: string

    @Column('text', {nullable:true})
    descripcion: string


    @ManyToOne(() => Usuario, (usuario) => usuario.publicaciones)
    usuario: Usuario;

}
