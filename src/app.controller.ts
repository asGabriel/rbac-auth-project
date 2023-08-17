import { Body, Controller, Headers, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Permissions } from './common/permission-decorator';
import { UserLoginDto } from './dto/user-login.dto';
import { PermissionDecoratorInterceptor } from './permission-decorator/permission-decorator.interceptor';

@Controller('/auth')
@UseInterceptors(PermissionDecoratorInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  private recurso: string = "anycontent"

  @Post()
  async login(@Body() data: UserLoginDto) {
    return await this.appService.userLogin(data, this.recurso);
  }

  @Post()
  async logout() {
    return '';
  }

  @Post('/resource-test')
  @Permissions('read')
  async resourceTest(@Body() data: {CONTENT: string}, @Headers('Authorization') authHeader: string) {
    const decodedToken = await this.appService.verifyToken(authHeader)
    return await this.appService.createAnyContent(data, decodedToken)
  }
}
