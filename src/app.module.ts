import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { HealthCheckController } from './health-check.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
