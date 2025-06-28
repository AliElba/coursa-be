// DTO for course responses
import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty()
  id: number;

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