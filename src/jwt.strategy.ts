import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from './prisma.service';
import { UserDto } from './dto/user.dto';
import { AppConfigService } from './core/configuration.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService, private appConfig: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use AppConfigService for JWT secret
      secretOrKey: appConfig.jwtSecret,
    });
  }

  // Validate the JWT payload and attach the user to the request
  async validate(payload: { sub: number; email: string }): Promise<UserDto> {
    // Find the user in the database
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user as UserDto;
  }
} 