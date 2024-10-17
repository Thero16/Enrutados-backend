import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class LoginAuthDto {

    @IsString()
    @IsEmail()
    correoElectronico: string;

    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una letra mayuscula, una letra minuscula y un numero'
    })
    contrasena: string;

}