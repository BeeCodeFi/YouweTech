import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@youwetech.com' },
    update: {},
    create: {
      email: 'admin@youwetech.com',
      name: 'Admin',
      hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('Seeded admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
