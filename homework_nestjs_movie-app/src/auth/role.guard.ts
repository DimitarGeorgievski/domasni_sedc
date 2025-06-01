import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { roleEnum } from './enums/role-enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<roleEnum>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if(!requiredRoles) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log("userot raboti: ", user)
    if(!user || !user.role){
      console.log("Userot ne postoi ili pak ete so vraka:", user);
      return false;
    }
    return requiredRoles.includes(user.role);
  }
}