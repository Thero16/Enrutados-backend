import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt.payload";
import { Usuario } from "../entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository:Repository<Usuario>
    ){
        super({
            secretOrKey:process.env.SECRET_PASSWORD,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPayload){
        const {correoElectronico}=payload;

        const usuario=await this.usuarioRepository.findOneBy({correoElectronico});
        if(!usuario){
            throw new BadRequestException("Unauthorized");
        }
        if(!usuario.isActive){
            throw new BadRequestException("Unauthorized");
        }
        
        return usuario;
    }
}