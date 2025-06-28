import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { GoogleLoginDto } from '../dto/google-login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthService } from './auth.service';

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
  @ApiOperation({ 
    summary: 'Authenticate with Google', 
    description: 'Exchanges a Google ID token for a JWT and user info. Creates a new user if they don\'t exist.' 
  })
  @ApiBody({ 
    type: GoogleLoginDto,
    description: 'Google ID token from frontend authentication'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'JWT and user info returned on successful login.', 
    type: AuthResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid or missing ID token' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid Google token' 
  })
  async googleLogin(@Body() body: GoogleLoginDto): Promise<AuthResponseDto> {
    // Delegate authentication to the AuthService
    return this.authService.googleLogin(body.idToken);
  }
} 