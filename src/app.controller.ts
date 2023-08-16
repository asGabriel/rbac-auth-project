import { Body, Controller, Headers, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Permissions } from './common/permission-decorator';

@Controller('/auth')
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
