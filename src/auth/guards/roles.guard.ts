import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private rereflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.rereflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(), // Look at the method (e.g., createPost)
      context.getClass(), // Look at the class (e.g., PostsController)
    ]);
    if (!requiredRoles) {
      return true;
    }
    let { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
