// DTO for creating a new course
import { ApiProperty } from '@nestjs/swagger';

export class CourseCreateDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  hours: number;

  @ApiProperty()
  numberOfExams: number;

  @ApiProperty()
  price: number;
} 