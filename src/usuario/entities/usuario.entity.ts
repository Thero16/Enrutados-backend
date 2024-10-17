import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { MinLength } from "class-validator";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{
        nullable:false,
    })
    nombreCompleto: string
    @BeforeInsert()
    capitalizeName(){
        this.nombreCompleto = this.nombreCompleto.toUpperCase();
    }

    @Column('text',{
        nullable:false,
        unique:true
    })
    correoElectronico: string

    @Column('text',{
        nullable:false
    })
    contrasena: string

    @Column('text',{
        nullable:false,
        unique:true
    })
    numero:number

    @Column('boolean',{default:true})
    isActive:boolean;

    @Column('text',{array:true,
    default:['user']
    })
    @MinLength(1)
    roles:string[];

    @OneToMany(() => Publicacion, (publicacion) => publicacion.usuario)
    publicaciones: Publicacion[];

   
}
