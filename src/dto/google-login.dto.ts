// Data Transfer Object for the request body when logging in with Google.
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  // Google ID token received from the frontend
  @ApiProperty({ description: 'Google ID token' })
  idToken: string;
} 