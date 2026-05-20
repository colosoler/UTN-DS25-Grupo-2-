# Etapa 1: build
# Usamos slim (Debian) en vez de alpine porque Sharp y Prisma usan binarios nativos que dependen de glibc, que alpine no tiene
FROM node:20-slim AS builder
WORKDIR /app

# Copiamos solo los package.json primero para aprovechar el cache de Docker:
# si no cambian las dependencias, Docker reutiliza esta capa y no reinstala todo
COPY package*.json ./
RUN npm ci

# OpenSSL es requerido por Prisma para generar y correr los binarios del query engine
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY . .

# Genera los binarios nativos de Prisma para el SO del contenedor
RUN npx prisma generate

# Compila TypeScript a JavaScript en /dist
RUN npm run build


# Etapa 2: imagen de producción
# Arrancamos desde cero para no incluir TypeScript, jest, y otras devDependencies
FROM node:20-slim
WORKDIR /app

COPY package*.json ./

# --omit=dev instala solo dependencias de producción, ignorando devDependencies
RUN npm ci --omit=dev

# OpenSSL es requerido por Prisma en runtime para correr el query engine
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# --chown asigna los archivos al usuario "node" para que pueda leerlos
# node:20-slim incluye este usuario por defecto, creado para correr apps sin root
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node prisma.config.ts ./
COPY --chown=node:node entrypoint.sh ./

# Hace el entrypoint ejecutable
RUN chmod +x entrypoint.sh

# Transfiere la propiedad de todo /app al usuario node, incluyendo node_modules
# instalados como root, para que Prisma pueda escribir sus binarios en runtime
RUN chown -R node:node /app

# Corre la app como usuario no-root por seguridad: si alguien explota una
# vulnerabilidad en la app, no tendrá acceso root al contenedor
USER node

EXPOSE 3000

# El entrypoint corre las migraciones y luego arranca el servidor
CMD ["./entrypoint.sh"]
