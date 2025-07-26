import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Singleton configuration service to centralize and validate all environment/config values.
 * Use this service instead of ConfigService directly for strong typing and validation.
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * Stripe secret key for API access.
   * Throws if not set.
   */
  get stripeSecretKey(): string {
    const value = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!value) throw new Error('STRIPE_SECRET_KEY is not set');
    return value;
  }

  /**
   * Frontend URL for redirects. Defaults to localhost:4200 if not set.
   */
  get frontendUrl(): string {
    return this.configService.get<string>('FRONTEND_URL') || 'http://localhost:4200';
  }

  /**
   * Google OAuth client ID. Throws if not set.
   */
  get googleClientId(): string {
    const value = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!value) throw new Error('GOOGLE_CLIENT_ID is not set');
    return value;
  }

  /**
   * JWT secret for signing tokens. Throws if not set.
   */
  get jwtSecret(): string {
    const value = this.configService.get<string>('JWT_SECRET');
    if (!value) throw new Error('JWT_SECRET is not set');
    return value;
  }

  /**
   * JWT expiration time. Defaults to '1d' if not set.
   */
  get jwtExpIn(): string {
    return this.configService.get<string>('JWT_EXP_IN') || '1d';
  }

  /**
   * CORS allowed origins. Returns an array, empty if not set.
   */
  get corsOrigins(): string[] {
    const origins = this.configService.get<string>('CORS_ORIGIN') || '';
    return origins.split(',').map(origin => origin.trim()).filter(Boolean);
  }

  /**
   * Application port. Defaults to 3000 if not set.
   */
  get port(): number {
    return Number(this.configService.get<string>('PORT')) || 3000;
  }
} 