// Data Transfer Object for the response returned after successful authentication.
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class AuthResponseDto {
  // JWT access token for authenticating future requests
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  // Authenticated user information
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
} 