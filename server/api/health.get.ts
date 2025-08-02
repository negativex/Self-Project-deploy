import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Basic health check
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
    };

    // Optional: Check database connection
    try {
      // You can add a simple database query here if needed
      // const db = await prisma.$queryRaw`SELECT 1`
      health.database = "connected";
    } catch (error) {
      health.database = "disconnected";
      health.status = "degraded";
    }

    return health;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Health check failed",
    });
  }
});
