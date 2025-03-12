# Jubliapp API - Setup and Execution Guide

This document explains how to set up, build, and run the Jubliapp API, built with NestJS, PostgreSQL, and Docker. We’ll also cover how to seed the database and how the frontend can interact with the API.

## Prerequisites
- Docker and Docker Compose installed.
- Node.js and npm (optional, for local development).

## 1. Clone the repository
```bash
git clone https://github.com/yorth21/jublilapp-api.git
cd jubliapp-api
```

## 2. Configure environment variables
Create a `.env` file in the project root and add the PostgreSQL configuration, for example:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_name_database

DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"
```

## 3. Build and start the containers
Use Docker Compose to build and start the services (API and database):

```bash
docker-compose up --build -d
```

This will build the images and start the containers in detached mode.

## 4. Seed the database
Run the Prisma seeder script inside the API container:

```bash
docker exec -it jubilapp-api node dist/prisma/seeder.js
```

This will execute the database seeding script.

## 5. Shut down the containers
When finished, you can stop the containers with:

```bash
docker-compose down
```

That’s it! Now the frontend can successfully communicate with the Jubliapp API. 🚀

