import { Controller, Get, Post, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CurrentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CourseDto } from '../dto/course.dto';
import { UserCourseDto } from '../dto/user-course.dto';

@ApiTags('courses')
@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // List all available courses
  @Get('courses')
  @ApiOperation({ 
    summary: 'Get all courses', 
    description: 'Retrieve a list of all available courses in the platform' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all courses retrieved successfully', 
    type: [CourseDto] 
  })
  async getAllCourses(): Promise<CourseDto[]> {
    return this.coursesService.getAllCourses();
  }

  // List all courses for the logged-in user
  @Get('my-courses')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user courses', 
    description: 'Retrieve all courses that the authenticated user is registered for' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User courses retrieved successfully', 
    type: [UserCourseDto] 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token' 
  })
  async getMyCourses(@CurrentUser() user: any): Promise<UserCourseDto[]> {
    return this.coursesService.getMyCourses(user.id);
  }

  // Register the logged-in user for a course (status: PENDING)
  @Post('courses/:id/register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Register for a course', 
    description: 'Register the authenticated user for a specific course with PENDING status' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Course ID to register for', 
    type: 'number' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Successfully registered for the course' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Already registered for this course' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Course not found' 
  })
  async registerCourse(@Param('id') courseId: number, @CurrentUser() user: any) {
    return this.coursesService.registerCourse(user.id, Number(courseId));
  }

  // Set a user's course status to ACTIVE
  @Patch('my-courses/:id/activate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Activate user course', 
    description: 'Change the status of a user course from PENDING to ACTIVE' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UserCourse ID to activate', 
    type: 'number' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Course status updated to ACTIVE successfully' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'UserCourse not found or does not belong to user' 
  })
  async activateCourse(@Param('id') userCourseId: number, @CurrentUser() user: any) {
    return this.coursesService.activateCourse(user.id, Number(userCourseId));
  }
} 