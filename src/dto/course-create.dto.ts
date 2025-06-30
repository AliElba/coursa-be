// DTO for creating a new course
import { ApiProperty } from '@nestjs/swagger';

export class LectureCreateDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  videoUrl: string;

  @ApiProperty()
  materialUrl: string;
}

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

  @ApiProperty({
    required: false,
    type: [LectureCreateDto],
    description: 'Optional lectures to create with the course',
  })
  lectures?: LectureCreateDto[];
} 