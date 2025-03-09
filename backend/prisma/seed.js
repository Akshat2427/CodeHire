const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hashing passwords for admins
  const hashedPassword1 = await bcrypt.hash('admin123', 10);
  const hashedPassword2 = await bcrypt.hash('admin456', 10);
  const hashedPassword3 = await bcrypt.hash('admin789', 10);

  // Seeding Admin Users
  await prisma.user.createMany({
    data: [
      { name: 'Akshat', email: 'akshat@example.com', password: hashedPassword1, role: 'ADMIN' },
      { name: 'Ankur', email: 'ankur@example.com', password: hashedPassword2, role: 'ADMIN' },
      { name: 'Anshul', email: 'anshul@example.com', password: hashedPassword3, role: 'ADMIN' },
    ],
    skipDuplicates: true,
  });

  // Seeding Courses
  await prisma.course.createMany({
    data: [
      {
        c_id: 'course-101',
        c_name: 'Full Stack Development',
        c_desc: 'Master front-end and back-end development.',
        c_price: 4999.99,
        c_rating: 4.8,
      },
      {
        c_id: 'course-102',
        c_name: 'Data Structures & Algorithms',
        c_desc: 'Learn DSA with real-world applications.',
        c_price: 2999.99,
        c_rating: 4.7,
      },
      {
        c_id: 'course-103',
        c_name: 'Cloud Computing with AWS',
        c_desc: 'Explore AWS services and cloud computing concepts.',
        c_price: 3999.99,
        c_rating: 4.6,
      },
      {
        c_id: 'course-104',
        c_name: 'Machine Learning & AI',
        c_desc: 'Understand ML algorithms and AI applications.',
        c_price: 5999.99,
        c_rating: 4.9,
      },
      {
        c_id: 'course-105',
        c_name: 'Cybersecurity Fundamentals',
        c_desc: 'Learn about ethical hacking and security best practices.',
        c_price: 3499.99,
        c_rating: 4.5,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Admins and Courses seeded successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
