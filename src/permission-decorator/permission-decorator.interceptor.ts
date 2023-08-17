import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionDecoratorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const permission = context.getHandler().prototype.permission;

    const request = context.switchToHttp().getRequest();
    
    request.permission = permission;

    return next.handle();
  }
}
