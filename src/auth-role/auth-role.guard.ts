import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppService } from 'src/app.service';
import { PayloadDto } from 'src/dto/payload.dto';
import { PrismaService } from 'src/helper/prisma.service';
import ac from '../common/access-control.helper'

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
    private reflector: Reflector,
    private appService: AppService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);
    const payload: PayloadDto = await this.appService.verifyToken(token);
    const requiredPermission: string = this.reflector.get<string>('permission', context.getHandler());

    try {
      const permission = ac.can(payload.ROLE).readAny('profile')
      // const permission = this.access_control.can('user').read('profile')
      console.log(permission.granted)

    } catch (error) {
      console.log(error.message)
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
