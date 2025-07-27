import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from '../prisma.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [ConfigModule, CoreModule],
  providers: [PaymentsService, PrismaService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
