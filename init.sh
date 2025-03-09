#!/bin/sh

# Ejecutar migraciones
npx prisma migrate deploy

# Ejecutar seed
node dist/prisma/seeder.js

# Iniciar la aplicación
npm run start:prod
