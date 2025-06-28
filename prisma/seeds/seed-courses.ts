import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCourses() {
  const courses = [
    {
      title: 'Agile Project Management Fundamentals',
      description: 'Master Agile methodologies including Scrum, Kanban, and Lean practices for effective project delivery.',
      image: 'https://example.com/agile-fundamentals.jpg',
      hours: 24,
      numberOfExams: 3,
      price: 89.99,
    },
    {
      title: 'Scrum Master Certification',
      description: 'Comprehensive training for Scrum Master role, including team facilitation and Agile coaching techniques.',
      image: 'https://example.com/scrum-master.jpg',
      hours: 32,
      numberOfExams: 4,
      price: 129.99,
    },
    {
      title: 'Construction Project Management',
      description: 'Learn construction project planning, scheduling, cost control, and risk management for infrastructure projects.',
      image: 'https://example.com/construction-pm.jpg',
      hours: 28,
      numberOfExams: 4,
      price: 149.99,
    },
    {
      title: 'Civil Engineering Design Principles',
      description: 'Fundamental principles of civil engineering design including structural analysis and material selection.',
      image: 'https://example.com/civil-engineering.jpg',
      hours: 36,
      numberOfExams: 5,
      price: 179.99,
    },
    {
      title: 'Lean Construction Management',
      description: 'Apply Lean principles to construction processes for improved efficiency and waste reduction.',
      image: 'https://example.com/lean-construction.jpg',
      hours: 20,
      numberOfExams: 3,
      price: 99.99,
    },
    {
      title: 'Engineering Leadership & Team Management',
      description: 'Develop leadership skills for engineering teams, including communication, motivation, and conflict resolution.',
      image: 'https://example.com/engineering-leadership.jpg',
      hours: 26,
      numberOfExams: 3,
      price: 119.99,
    },
  ];

  try {
    console.log('Seeding engineering and construction courses...');
    
    for (const course of courses) {
      await prisma.course.create({
        data: course,
      });
      console.log(`Created course: ${course.title}`);
    }
    
    console.log('All courses seeded successfully!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourses(); 