// Data Transfer Object representing a user in the system, used for API responses.
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  // Unique identifier for the user
  @ApiProperty()
  id: number;

  // Google account ID associated with the user
  @ApiProperty()
  googleId: string;

  // User's email address
  @ApiProperty()
  email: string;

  // User's display name (nullable)
  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  // URL to the user's profile picture (nullable)
  @ApiProperty({ required: false, nullable: true })
  picture: string | null;

  // Timestamp when the user was created
  @ApiProperty()
  createdAt: Date;

  // Timestamp when the user was last updated
  @ApiProperty()
  updatedAt: Date;
} 