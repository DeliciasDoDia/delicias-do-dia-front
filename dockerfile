# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência e instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar o restante do código e gerar build
COPY . .
RUN npm run build

# Etapa 2: Imagem final (produção)
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copiar apenas o necessário para rodar a aplicação
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
