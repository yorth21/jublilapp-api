# Etapa de construcción
FROM node:20-alpine AS build

ENV NODE_ENV development

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Compilar la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

COPY ./init.sh /init.sh
RUN chmod +x /init.sh

# Comando para ejecutar la aplicación
CMD ["sh", "/init.sh"]