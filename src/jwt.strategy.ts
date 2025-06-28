import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Ensure secretOrKey is always a string to satisfy type requirements
      // WARNING: If JWT_SECRET is not set, authentication will fail
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  // Validate the JWT payload and attach the user to the request
  async validate(payload: { sub: number; email: string }): Promise<User> {
    // Find the user in the database
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
} 