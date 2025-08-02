import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import path from "path";

async function initDatabase() {
  try {
    console.log("🗄️  Initializing SQLite database...");

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
      console.log("📁 Created data directory");
    }

    // Generate Prisma client
    console.log("🔧 Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });

    // Push database schema
    console.log("📊 Pushing database schema...");
    execSync("npx prisma db push", { stdio: "inherit" });

    // Run seeder
    console.log("🌱 Seeding database...");
    execSync("npx tsx seed-simple.ts", { stdio: "inherit" });

    console.log("✅ Database initialization completed!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  }
}

initDatabase();
