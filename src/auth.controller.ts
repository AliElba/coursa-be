import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

// Controller for authentication endpoints
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint to handle Google Sign-In
  @Post('google')
  async googleLogin(@Body('idToken') idToken: string) {
    return this.authService.googleLogin(idToken);
  }
} 