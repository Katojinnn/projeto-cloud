# Etapa 1: build
FROM node:20 AS build
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: runtime
FROM node:20
WORKDIR /app

# Copia apenas o build e node_modules do estágio anterior
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]