import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = process.env.ADMIN_PASSWORD || 'SecureAdmin123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@greenapple.com' },
    update: {},
    create: {
      email: 'admin@greenapple.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'admin',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);
  console.log('🔑 Password:', adminPassword);
  console.log('⚠️  Please change the default password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
