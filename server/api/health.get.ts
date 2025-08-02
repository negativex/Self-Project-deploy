import { defineEventHandler, setResponseStatus } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Check if the application is running
    const startTime = Date.now();

    // Basic health checks
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      checks: {
        server: "ok",
        database: "checking...",
      },
    };

    // Check database connection
    try {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();

      // Simple database query to check connection
      await prisma.$queryRaw`SELECT 1`;
      await prisma.$disconnect();

      health.checks.database = "ok";
    } catch (dbError) {
      health.checks.database = "error";
      health.status = "unhealthy";
      console.error("Database health check failed:", dbError);
    }

    const responseTime = Date.now() - startTime;
    health.responseTime = `${responseTime}ms`;

    // Set appropriate status code
    if (health.status === "unhealthy") {
      setResponseStatus(event, 503);
    }

    return health;
  } catch (error) {
    console.error("Health check error:", error);

    setResponseStatus(event, 503);
    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Internal server error",
    };
  }
});
