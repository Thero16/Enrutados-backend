import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const getUser= createParamDecorator((data, ctx: ExecutionContext)=>{
    const req= ctx.switchToHttp().getRequest();
    const usuario= req.user;
    if(!usuario) throw new InternalServerErrorException('Usuario no encontrado');
    
    return usuario;
})