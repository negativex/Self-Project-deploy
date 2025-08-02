# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Copy package files and lock file
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies for build)
# Using --prefer-offline and --no-audit for faster and cleaner install
RUN npm ci --prefer-offline --no-audit && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all application source code
COPY . .

# Re-run npm install to ensure all modules are correctly linked and available in this stage's context
# This helps resolve potential issues with module resolution or native module compilation on Alpine
RUN npm install --prefer-offline --no-audit && npm cache clean --force

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run nuxt
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy the built application output
COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output
# Copy Prisma schema and database for runtime
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma /app/prisma
# Copy package.json for production dependencies install
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json /app/

# Copy SQLite database if it exists (ensure it's copied if present in the build context)
# Note: For production, consider mounting a persistent volume for dev.db
COPY --from=builder --chown=nuxtjs:nodejs /app/dev.db* /app/

# Install only production dependencies and Prisma CLI for runtime migrations
RUN npm ci --only=production --prefer-offline --no-audit && npm cache clean --force
RUN npm install prisma --save-dev # Ensure prisma CLI is available for migrate deploy

USER nuxtjs

EXPOSE 3000

# Run database migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && node .output/server/index.mjs"]
