import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { AppConfigService } from '../core/configuration.service';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private appConfig: AppConfigService,
  ) {
    this.client = new OAuth2Client(this.appConfig.googleClientId);
  }

  // Main logic for Google Sign-In
  async googleLogin(idToken: string) {
    // 1. Verify Google token
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.appConfig.googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload) throw new UnauthorizedException('Invalid Google token');

    // 2. Find or create user in the database
    let user = await this.prisma.user.findUnique({ where: { googleId: payload.sub } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: payload.sub,
          email: payload.email!,
          name: payload.name,
          picture: payload.picture, 
        },
      });
    }

    // 3. Generate JWT for the user
    const jwt = this.jwtService.sign({ sub: user.id, email: user.email });

    // 4. Return JWT and user info
    return { accessToken: jwt, user };
  }
} 