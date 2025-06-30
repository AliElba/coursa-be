import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourseDto, LectureDto } from '../dto/course.dto';
import { Prisma, Course as PrismaCourse, Lecture as PrismaLecture } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // List all available courses
  async getAllCourses() {
    const courses = await this.prisma.course.findMany({ include: { lectures: true } });
    return courses.map((course: PrismaCourse & { lectures: PrismaLecture[] }) => ({
      ...course,
      lectures: course.lectures.map((lecture: PrismaLecture) => ({ ...lecture }))
    }));
  }

  // List all courses for the logged-in user, including status
  async getMyCourses(userId: number) {
    return this.prisma.userCourse.findMany({
      where: { userId },
      include: { course: { include: { lectures: true } } },
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
    const course = await this.prisma.course.findUnique({ where: { id }, include: { lectures: true } });
    if (!course) throw new NotFoundException('Course not found');
    return {
      ...course,
      lectures: course.lectures.map((lecture: PrismaLecture) => ({ ...lecture }))
    };
  }
} 