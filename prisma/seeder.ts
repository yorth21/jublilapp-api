import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [juan, maria] = await prisma.$transaction(async (prisma) => {
    const juan = await prisma.users.create({
      data: {
        names: 'Juan Carlos',
        lastNames: 'Gómez Pérez',
        identification: '1234567890',
        email: 'juan.gomez@example.com',
        address: 'Calle 123 #45-67',
        phone: '3001234567',
        password: '$2b$10$hashedpassword1',
        birthDate: new Date('1990-05-21'),
        gender: 'M',
        job: 'Ingeniero de Software',
        isActive: true,
      },
    });

    const maria = await prisma.users.create({
      data: {
        names: 'María Fernanda',
        lastNames: 'López Ruiz',
        identification: '0987654321',
        email: 'maria.lopez@example.com',
        address: 'Carrera 45 #89-10',
        phone: '3109876543',
        password: '$2b$10$hashedpassword2',
        birthDate: new Date('1995-09-10'),
        gender: 'F',
        job: 'Diseñadora Gráfica',
        isActive: true,
      },
    });

    return [juan, maria];
  });

  console.log({ juan, maria });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
