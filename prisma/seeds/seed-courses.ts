import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCourses() {
  const courses = [
    {
      title: 'Construction Project Management',
      description: 'Master the fundamentals of managing construction projects, including planning, scheduling, and resource management for successful project delivery.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      hours: 40,
      numberOfExams: 2,
      price: 249.99,
      lectures: [
        {
          title: 'Introduction to Construction Management',
          description: 'Overview of the construction industry and the role of a project manager.',
          image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/construction-intro',
          materialUrl: 'https://example.com/materials/construction-intro.pdf',
        },
        {
          title: 'Project Planning and Scheduling',
          description: 'Learn about Gantt charts, critical path method, and scheduling best practices.',
          image: 'https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/planning-scheduling',
          materialUrl: 'https://example.com/materials/planning-scheduling.pdf',
        },
        {
          title: 'Resource Management in Construction',
          description: 'Techniques for managing labor, materials, and equipment efficiently.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/resource-management',
          materialUrl: 'https://example.com/materials/resource-management.pdf',
        },
      ],
    },
    {
      title: 'Agile Project Management for Engineers',
      description: 'Apply agile methodologies to engineering projects for improved flexibility, collaboration, and delivery.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      hours: 32,
      numberOfExams: 2,
      price: 199.99,
      lectures: [
        {
          title: 'Agile Principles and Mindset',
          description: 'Understand the core values and principles of agile project management.',
          image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/agile-principles',
          materialUrl: 'https://example.com/materials/agile-principles.pdf',
        },
        {
          title: 'Scrum Framework in Engineering',
          description: 'Explore Scrum roles, events, and artifacts tailored for engineering teams.',
          image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/scrum-framework',
          materialUrl: 'https://example.com/materials/scrum-framework.pdf',
        },
        {
          title: 'Kanban and Lean in Construction',
          description: 'Implement Kanban boards and lean principles to optimize engineering workflows.',
          image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/kanban-lean',
          materialUrl: 'https://example.com/materials/kanban-lean.pdf',
        },
      ],
    },
    {
      title: 'Building Information Modeling (BIM) Essentials',
      description: 'Learn the basics of BIM and how it transforms construction project collaboration and delivery.',
      image: 'https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=800&q=80',
      hours: 28,
      numberOfExams: 1,
      price: 179.99,
      lectures: [
        {
          title: 'Introduction to BIM',
          description: 'What is BIM and why is it important in modern construction?',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/bim-intro',
          materialUrl: 'https://example.com/materials/bim-intro.pdf',
        },
        {
          title: 'BIM Tools and Technologies',
          description: 'Overview of popular BIM software and their applications.',
          image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/bim-tools',
          materialUrl: 'https://example.com/materials/bim-tools.pdf',
        },
      ],
    },
    {
      title: 'Lean Construction Techniques',
      description: 'Adopt lean principles to minimize waste and maximize value in construction projects.',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      hours: 24,
      numberOfExams: 1,
      price: 149.99,
      lectures: [
        {
          title: 'Lean Construction Overview',
          description: 'Principles and benefits of lean construction.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/lean-overview',
          materialUrl: 'https://example.com/materials/lean-overview.pdf',
        },
        {
          title: 'Value Stream Mapping',
          description: 'How to identify and eliminate waste using value stream mapping.',
          image: 'https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://example.com/videos/value-stream',
          materialUrl: 'https://example.com/materials/value-stream.pdf',
        },
      ],
    },
  ];

  try {
    console.log('Seeding Construction Engineering and Agile Management courses...');
    // Clear existing courses and lectures first
    await prisma.userCourse.deleteMany({});
    await prisma.lecture.deleteMany({});
    await prisma.course.deleteMany({});
    console.log('Cleared existing courses and lectures');
    for (const course of courses) {
      await prisma.course.create({
        data: {
          ...course,
          lectures: {
            create: course.lectures,
          },
        },
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