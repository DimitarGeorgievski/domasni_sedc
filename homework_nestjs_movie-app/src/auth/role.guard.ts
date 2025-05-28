import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleEnum } from './enums/role-enum';
import { Roles } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const [classRole, handlerRole] = this.reflector.getAll(Roles, [
      context.getClass(),
      context.getHandler(),
    ])
    const decorateRole = handlerRole || classRole;
    if (!decorateRole) return true;
    const userRole = request.user.role;
    if(userRole !== decorateRole) return false;
    return true;
  }
}
