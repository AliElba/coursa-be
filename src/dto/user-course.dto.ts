// DTO for user course responses (includes course data)
import { ApiProperty } from '@nestjs/swagger';
import { CourseDto } from './course.dto';

export class UserCourseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty({ enum: ['PENDING', 'ACTIVE'] })
  status: 'PENDING' | 'ACTIVE';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => CourseDto })
  course: CourseDto;
} 