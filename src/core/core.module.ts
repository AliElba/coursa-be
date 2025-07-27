import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './configuration.service';

@Module({
  imports: [ConfigModule],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class CoreModule {} 