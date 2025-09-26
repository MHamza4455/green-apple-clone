import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createSuperAdmin() {
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { role: UserRole.SUPER_ADMIN },
    });

    if (existingSuperAdmin) {
      console.log("Super admin already exists:", existingSuperAdmin.email);
      return;
    }

    // Create super admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const superAdmin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@radiantwaytravel.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
      },
    });

    console.log("Super admin created successfully:");
    console.log("Email:", superAdmin.email);
    console.log("Password: admin123");
    console.log("Role:", superAdmin.role);
  } catch (error) {
    console.error("Error creating super admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();
