import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database initialization...");

  try {
    // Push database schema
    console.log("📋 Pushing database schema...");

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@pharmacy.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        role: "ADMIN",
        isActive: true,
        emailVerified: true,
      },
    });

    console.log("👤 Admin user created:", admin.email);

    // Create sample categories
    const categories = [
      {
        name: "Pain Relief",
        slug: "pain-relief",
        description: "Pain relief medications",
      },
      {
        name: "Cold & Flu",
        slug: "cold-flu",
        description: "Cold and flu treatments",
      },
      {
        name: "Vitamins & Supplements",
        slug: "vitamins-supplements",
        description: "Vitamins and dietary supplements",
      },
      {
        name: "First Aid",
        slug: "first-aid",
        description: "First aid supplies",
      },
      {
        name: "Personal Care",
        slug: "personal-care",
        description: "Personal care products",
      },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      });
    }

    console.log("📂 Categories created");

    // Create sample products
    const products = [
      {
        name: "Paracetamol 500mg",
        slug: "paracetamol-500mg",
        description: "Pain relief and fever reducer",
        price: 5.99,
        stock: 100,
        categoryId: 1,
        isActive: true,
        requiresPrescription: false,
      },
      {
        name: "Vitamin C 1000mg",
        slug: "vitamin-c-1000mg",
        description: "Immune system support",
        price: 12.99,
        stock: 50,
        categoryId: 3,
        isActive: true,
        requiresPrescription: false,
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }

    console.log("🛍️ Sample products created");
    console.log("✅ Database initialization completed!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
