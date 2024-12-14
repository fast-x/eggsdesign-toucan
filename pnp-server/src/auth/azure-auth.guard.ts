import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

const IS_PUBLIC_KEY = 'isPublic';

/***
 * @constructor
 * @description Decorator to enable public routes - see usage in "events.controller.ts"
 */
export function Public() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

@Injectable()
export class AzureAuthGuard extends AuthGuard('azure') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
