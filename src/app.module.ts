import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessControlModule } from './access-control/access-control.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthRoleMiddleware } from './auth-role/auth-role.middleware';
import { PrismaService } from './helper/prisma.service';
import { UserModule } from './user/user.module';
import { AuthRoleGuard } from './auth-role/auth-role.guard';

@Module({
  imports: [AccessControlModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService, AuthRoleMiddleware, AuthRoleGuard],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthRoleMiddleware)
  //     .forRoutes("/auth/resource-test");
  // }
}
