// DTO for updating the status of a user course
import { ApiProperty } from '@nestjs/swagger';

export class UserCourseStatusDto {
  @ApiProperty({ enum: ['PENDING', 'ACTIVE'] })
  status: 'PENDING' | 'ACTIVE';
} 