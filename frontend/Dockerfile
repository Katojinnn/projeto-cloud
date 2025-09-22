# Etapa base
FROM node:18-alpine AS base
WORKDIR /app

# Dependências
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

# Build do Next.js
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Gera build standalone
RUN npm run build

# Imagem final para rodar o frontend
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
CMD ["node", ".next/standalone/server.js"]