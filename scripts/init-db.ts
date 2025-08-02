import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@pharmacy.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@pharmacy.com",
      password: hashedPassword,
      name: "Administrator",
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample categories
  const categories = [
    {
      name: "Over-the-Counter Medicines",
      slug: "otc-medicines",
      description: "Non-prescription medications",
    },
    {
      name: "Prescription Medicines",
      slug: "prescription",
      description: "Prescription-only medications",
    },
    {
      name: "Vitamins & Supplements",
      slug: "vitamins-supplements",
      description: "Health supplements and vitamins",
    },
    {
      name: "Personal Care",
      slug: "personal-care",
      description: "Personal hygiene and care products",
    },
    {
      name: "Medical Devices",
      slug: "medical-devices",
      description: "Medical equipment and devices",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories created");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
