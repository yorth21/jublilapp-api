FROM node:23-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

RUN echo $DATABASE_URL

# Compila el proyecto
RUN npm run build

# Ejecuta las migraciones de Prisma
RUN npx prisma generate
RUN npx prisma migrate deploy

# Poblado de la base de datos con el seeder
RUN npx prisma db seed

# Expone el puerto
EXPOSE 4000

# Comando para ejecutar la app
CMD ["npm", "run", "start:prod"]
