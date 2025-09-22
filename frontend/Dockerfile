# Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o projeto, incluindo .env.local
COPY . .

# Build do Next.js (variáveis NEXT_PUBLIC_* serão aplicadas)
RUN npm run build

# Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Copia apenas o necessário do builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.local ./ 

ENV NODE_ENV=production
EXPOSE 8080

CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "8080"]