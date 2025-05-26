import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roleEnum } from './enums/role-enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<roleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if(!roles){
      return true;
    }
    const { user} = context.switchToHttp().getRequest();
    if(!user){
      throw new NotFoundException("tuka lezi zajakot")
    }
    return roles.some(roles => user.roles?.includes(roles));
  }
}
