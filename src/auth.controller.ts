import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

// Controller for authentication-related endpoints
@ApiTags('auth') // Group endpoints under 'auth' in Swagger UI
@Controller('auth')
export class AuthController {
  // Inject AuthService to handle authentication logic
  constructor(private readonly authService: AuthService) {}

  /**
   * Google Sign-In endpoint
   * Accepts a Google ID token and returns a JWT and user info if successful.
   * @param body GoogleLoginDto containing the Google ID token
   */
  @Post('google')
  @ApiOperation({ summary: 'Authenticate with Google', description: 'Exchanges a Google ID token for a JWT and user info.' })
  @ApiBody({ type: GoogleLoginDto }) // Document the expected request body
  @ApiResponse({ status: 201, description: 'JWT and user info returned on successful login.', type: AuthResponseDto }) // Document the response
  async googleLogin(@Body() body: GoogleLoginDto) {
    // Delegate authentication to the AuthService
    return this.authService.googleLogin(body.idToken);
  }
} 