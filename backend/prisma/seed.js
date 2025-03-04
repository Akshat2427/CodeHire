const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await bcrypt.hash('Akshat@123', 10);
  const hashedPassword2 = await bcrypt.hash('Ankur@123', 10);
  const hashedPassword3 = await bcrypt.hash('Anshul@123', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Akshat', email: 'akshat@gmail.com', password: hashedPassword1, role: 'ADMIN' },
      { name: 'Ankur', email: 'ankur@gmail.com', password: hashedPassword2, role: 'ADMIN' },
      { name: 'Anshul', email: 'anshul@gmail.com', password: hashedPassword3, role: 'ADMIN' },
    ],
    skipDuplicates: true, 
  });

  console.log('Admins seeded successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
