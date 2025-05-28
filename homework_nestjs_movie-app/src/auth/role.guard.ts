import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleEnum } from './enums/role-enum';
import { Roles } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    // if(!user) return false
    // console.log(user)
    const [classRole, handlerRole] = this.reflector.getAll<String[]>(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);
    const decoratorRole = handlerRole || classRole;
    console.log("decorator ROle: ",decoratorRole)
    if(!decoratorRole) return true;
    console.log("class Role: ", classRole)
    console.log("handler Role: ", handlerRole)

    const hasRole = user.roles.some((role: string) => {
      decoratorRole.includes(role)
    })
    console.log("hasROle", hasRole);
    if(!hasRole) return false
    return true;
  }
}
