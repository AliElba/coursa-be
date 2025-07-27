import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../jwt.strategy';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from '../core/core.module';

// AuthModule bundles all authentication logic
@Module({
  imports: [
    PassportModule,
    ConfigModule,
    CoreModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Will be replaced in JwtStrategy
        signOptions: { expiresIn: configService.get<string>('JWT_EXP_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {} 