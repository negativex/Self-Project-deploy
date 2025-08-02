import { defineEventHandler, setResponseStatus } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Basic health check
    const healthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
    };

    // Optional: Check database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      healthStatus.database = "connected";
    } catch (error) {
      healthStatus.database = "disconnected";
      healthStatus.status = "unhealthy";
    }

    setResponseStatus(event, healthStatus.status === "healthy" ? 200 : 503);
    return healthStatus;
  } catch (error) {
    setResponseStatus(event, 503);
    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
    };
  } finally {
    await prisma.$disconnect();
  }
});
