import { IsString, MinLength, IsEmail, Contains, MaxLength, Matches, IsInt } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(1)
    nombreCompleto: string;
    @IsEmail()
    @Contains('@eia.edu.co')
    correoElectronico: string;
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'contraseña muy debil' })
    contrasena: string;
    @IsInt()
    numero: number;

}
