import { Injectable, NestMiddleware } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';
import { NextFunction, Request, Response } from 'express';
import { AppService } from 'src/app.service';
import { PayloadDto } from 'src/dto/payload.dto';
import ac from '../common/access-control.helper'
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRoleMiddleware implements NestMiddleware {
  constructor(
    private appService: AppService,
    private reflector: Reflector
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {

    const payload: PayloadDto = await this.appService.verifyToken(req.headers.authorization);
    // const requiredPermission = this.reflector.get<string>('permission', context.getHandler());
    try {
      const access_control = new AccessControl()
      const permission = ac.can(payload.ROLE).readAny('profile')
      // const permission = this.access_control.can('user').read('profile')
      console.log(permission.granted)

    } catch (error) {
      console.log(error.message)
    }
    next();
  }
}
