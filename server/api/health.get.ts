import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Kiểm tra kết nối database nếu cần
    // await prisma.$queryRaw`SELECT 1`

    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    };
  } catch (error) {
    throw createError({
      statusCode: 503,
      statusMessage: "Service Unavailable",
    });
  }
});
