const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();
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
        logo:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        c_name: 'Google SWE',
        c_desc: 'Master front-end and back-end development with Google.',
        c_price: 25.99,
        c_rating: 4.7,
        category: "MAANG",
        stageCount:6
      },
      {
        c_id: 'course-102',
        logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s",
        c_name: 'Amazon SDE',
        c_desc: 'Learn data structures and algorithms with Amazon.',
        c_price: 29.99,
        c_rating: 4.8,
        category: "MAANG",  
        stageCount:6
      },
      {
        c_id: 'course-103',
        logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpIfA-_GwTVZBVlpCvdIcLVOsCxn4BmqHA&s",
        c_name: 'Meta Frontend',
        c_desc: 'Become a proficient front-end developer with Meta.',
        c_price: 19.99,
        c_rating: 4.6,
        category: "MAANG",
        stageCount:6
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
