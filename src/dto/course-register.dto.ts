// DTO for registering a user to a course
import { ApiProperty } from '@nestjs/swagger';

export class CourseRegisterDto {
  @ApiProperty()
  courseId: number;
} 