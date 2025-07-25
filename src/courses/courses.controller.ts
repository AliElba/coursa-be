import { Controller, Get, Post, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CurrentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CourseDto } from '../dto/course.dto';
import { UserCourseDto } from '../dto/user-course.dto';
import { UnauthorizedException } from '@nestjs/common';
import { StripeCheckoutSessionUrlDto } from '../dto/stripe-checkout-session-url.dto';
import { ConfigModule } from '@nestjs/config';

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
    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated');
    }
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

  @Get('courses/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course details', type: CourseDto })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseById(@Param('id', ParseIntPipe) id: number): Promise<CourseDto> {
    return this.coursesService.getCourseById(id);
  }

  /**
   * Create a Stripe Checkout session for a course purchase.
   * Returns a DTO containing the Stripe-hosted payment page URL for frontend redirection.
   */
  @Post('courses/:id/checkout-session')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Stripe Checkout session', description: 'Create a Stripe Checkout session for the specified course and return the session URL.' })
  @ApiParam({ name: 'id', description: 'Course ID to purchase', type: Number })
  @ApiOkResponse({ description: 'Stripe Checkout session created', type: StripeCheckoutSessionUrlDto })
  async createStripeCheckoutSession(@Param('id', ParseIntPipe) courseId: number, @CurrentUser() user: any): Promise<StripeCheckoutSessionUrlDto> {
    return this.coursesService.createStripeCheckoutSession(courseId, user);
  }
} 