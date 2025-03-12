#!/bin/sh

# Ejecutar migraciones
npx prisma migrate deploy

# Iniciar la aplicación
npm run start:prod
