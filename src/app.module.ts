import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
