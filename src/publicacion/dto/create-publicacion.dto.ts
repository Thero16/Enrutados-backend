import { IsInt, IsString, MinLength} from "class-validator";

export class CreatePublicacionDto {
    @IsInt()
    numeroTotalPuestos: number;
    @IsString()
    @MinLength(1)
    zona: string;
    @IsString()
    @MinLength(1)
    descripcion:string;

}
