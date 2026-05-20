# Etapa 1: build
# Alpine está bien acá porque esta etapa es temporal: solo corre npm run build y se descarta.
# No hay binarios nativos que dependan de glibc
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos solo los package.json primero para aprovechar el cache de Docker:
# si no cambian las dependencias, Docker reutiliza esta capa y no reinstala todo
COPY package*.json ./
RUN npm ci

COPY . .

# Vite incrusta las variables VITE_* en el bundle durante el build, no en runtime
# Por eso se pasan como ARG (argumentos de build) desde docker-compose
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_RECAPTCHA_SITE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_RECAPTCHA_SITE=$VITE_RECAPTCHA_SITE

# Genera los archivos estáticos (HTML, JS, CSS) en /dist
RUN npm run build


# Etapa 2: servidor de producción
# No necesitamos Node en producción: el frontend ya está compilado a archivos estáticos
# Nginx es un servidor web liviano diseñado para servir archivos estáticos eficientemente
FROM nginx:alpine

# Copiamos los archivos compilados de la etapa anterior al directorio que sirve nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración custom de nginx necesaria para que React Router funcione:
# sin esto, cualquier ruta que no sea "/" (ej: /materiales) devuelve 404
# porque nginx busca el archivo físico y no existe, solo existe index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
