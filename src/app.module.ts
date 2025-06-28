import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { HealthCheckController } from './health-check.controller';
import { AuthModule } from './auth/auth.module';
import { CoursesService } from './courses/courses.service';
import { CoursesController } from './courses/courses.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, HealthCheckController, CoursesController],
  providers: [AppService, PrismaService, CoursesService],
})
export class AppModule {}
