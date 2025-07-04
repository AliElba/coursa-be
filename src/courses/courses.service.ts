import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourseDto, LectureDto } from '../dto/course.dto';
import { UserCourseDto } from '../dto/user-course.dto';
import { Prisma } from '@prisma/client';
import Stripe from 'stripe';
import { StripeCheckoutSessionDto } from '../dto/stripe-checkout-session.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // List all available courses
  async getAllCourses(): Promise<CourseDto[]> {
    const courses = await this.prisma.course.findMany({
      include: { lectures: true } as any
    });
    return courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      hours: course.hours,
      numberOfExams: course.numberOfExams,
      price: course.price,
      lectures: course.lectures ? [...(course.lectures as any[])].sort((a, b) => a.title.localeCompare(b.title)) : []
    }) as unknown as CourseDto);
  }

  // List all courses for the logged-in user, including status
  async getMyCourses(userId: number): Promise<UserCourseDto[]> {
    const userCourses = await this.prisma.userCourse.findMany({
      where: { userId },
      include: {
        course: {
          include: { lectures: true } as any
        }
      },
    });
    return userCourses.map(userCourse => {
      const course = userCourse.course;
      return {
        id: userCourse.id,
        userId: userCourse.userId,
        courseId: userCourse.courseId,
        status: userCourse.status,
        createdAt: userCourse.createdAt,
        updatedAt: userCourse.updatedAt,
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          image: course.image,
          hours: course.hours,
          numberOfExams: course.numberOfExams,
          price: course.price,
          lectures: course.lectures ? [...(course.lectures as any[])].sort((a, b) => a.title.localeCompare(b.title)) : []
        }
      } as unknown as UserCourseDto;
    });
  }

  // Register the logged-in user for a course (status: PENDING)
  async registerCourse(userId: number, courseId: number) {
    // Check if already registered
    const existing = await this.prisma.userCourse.findFirst({
      where: { userId, courseId },
    });
    if (existing) {
      throw new ForbiddenException('Already registered for this course');
    }
    return this.prisma.userCourse.create({
      data: {
        userId,
        courseId,
        status: 'PENDING',
      },
    });
  }

  // Set a user's course status to ACTIVE
  async activateCourse(userId: number, userCourseId: number) {
    // Ensure the user owns this UserCourse
    const userCourse = await this.prisma.userCourse.findUnique({
      where: { id: userCourseId },
    });
    if (!userCourse || userCourse.userId !== userId) {
      throw new NotFoundException('UserCourse not found');
    }
    return this.prisma.userCourse.update({
      where: { id: userCourseId },
      data: { status: 'ACTIVE' },
    });
  }

  async getCourseById(id: number): Promise<CourseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { lectures: true } as any
    });
    if (!course) throw new NotFoundException('Course not found');
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      hours: course.hours,
      numberOfExams: course.numberOfExams,
      price: course.price,
      lectures: course.lectures ? [...(course.lectures as any[])].sort((a, b) => a.title.localeCompare(b.title)) : []
    } as unknown as CourseDto;
  }

  /**
   * Creates a Stripe Checkout session for a course purchase
   * @param courseId - The course to purchase
   * @param user - The current user (must have email)
   * @returns StripeCheckoutSessionDto with session URL
   */
  async createStripeCheckoutSession(courseId: number, user: { id: number; email: string }): Promise<StripeCheckoutSessionDto> {
    // Initialize Stripe with secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Get course details
    const course = await this.getCourseById(courseId);
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: course.title },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4200/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/payment-cancel',
      metadata: { userId: user.id.toString(), courseId: course.id.toString() },
    });
    return { url: session.url! };
  }
} 