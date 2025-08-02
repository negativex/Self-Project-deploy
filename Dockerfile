FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production && npm cache clean --force

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

RUN mkdir -p /app/data && chown nuxtjs:nodejs /app/data

COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma /app/prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/package*.json /app/

COPY --from=builder --chown=nuxtjs:nodejs /app/dev.db* /app/data/ 2>/dev/null || true

USER nuxtjs

EXPOSE 3000

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV DATABASE_URL=file:/app/data/production.db

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]
