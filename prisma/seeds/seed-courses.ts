import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCourses() {
  const courses = [
    {
      title: 'AI Certification Exam',
      description: 'Validate your knowledge and skills in artificial intelligence with our comprehensive certification exam covering machine learning, deep learning, and AI applications.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
      hours: 40,
      numberOfExams: 3,
      price: 199.99,
    },
    {
      title: 'Data Science Proficiency Test',
      description: 'Assess your proficiency in data science with our challenging and insightful test covering statistics, programming, and data analysis techniques.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      hours: 32,
      numberOfExams: 2,
      price: 149.99,
    },
    {
      title: 'Machine Learning Specialist Assessment',
      description: 'Demonstrate your expertise in machine learning with our specialized assessment covering algorithms, model evaluation, and practical applications.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      hours: 28,
      numberOfExams: 2,
      price: 129.99,
    },
    {
      title: 'Deep Learning Fundamentals Exam',
      description: 'Test your knowledge of deep learning principles and techniques with our comprehensive exam covering neural networks, CNNs, RNNs, and transformers.',
      image: 'https://images.unsplash.com/photo-1536528087227-8b3f5f9d2ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      hours: 36,
      numberOfExams: 3,
      price: 179.99,
    },
    {
      title: 'Natural Language Processing Assessment',
      description: 'Evaluate your skills in natural language processing with our challenging assessment covering text analysis, language models, and NLP applications.',
      image: 'https://images.unsplash.com/photo-1526378729312-5076c5a09e1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      hours: 30,
      numberOfExams: 2,
      price: 139.99,
    },
    {
      title: 'Computer Vision Applications Certification',
      description: 'Validate your knowledge and skills in computer vision applications with our comprehensive certification covering image processing, object detection, and computer vision algorithms.',
      image: 'https://images.unsplash.com/photo-1518779570999-870a3c6e8a95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      hours: 34,
      numberOfExams: 2,
      price: 159.99,
    },
  ];

  try {
    console.log('Seeding AI and Data Science courses...');
    
    // Clear existing courses first
    await prisma.course.deleteMany({});
    console.log('Cleared existing courses');
    
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