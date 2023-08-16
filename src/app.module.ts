import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './helper/prisma.service';
import { AccessControlModule } from './access-control/access-control.module';

@Module({
  imports: [AccessControlModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
