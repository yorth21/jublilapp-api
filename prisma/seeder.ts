import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seederUsers() {
  const [juan, maria] = await prisma.$transaction(async (prisma) => {
    const juan = await prisma.users.create({
      data: {
        names: 'Juan Carlos',
        lastNames: 'Gómez Pérez',
        identification: '1234567890',
        email: 'juan.gomez@example.com',
        address: 'Calle 123 #45-67',
        phone: '3001234567',
        password:
          '$2b$10$lSuJRFTU5.0OMViGc4xLWeVpYPu9sJuuv27m56CnBra85DVHzsKWa',
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
        password:
          '$2b$10$lSuJRFTU5.0OMViGc4xLWeVpYPu9sJuuv27m56CnBra85DVHzsKWa',
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

async function seederVocationalTest() {
  await prisma.$transaction(async (prisma) => {
    const realistic = await prisma.vocationalCategories.create({
      data: {
        code: 'R',
        name: 'Realista',
        description: 'Prefiere trabajos manuales y técnicos.',
      },
    });

    const investigator = await prisma.vocationalCategories.create({
      data: {
        code: 'I',
        name: 'Investigador',
        description: 'Se inclina por la ciencia y el análisis.',
      },
    });

    const artistic = await prisma.vocationalCategories.create({
      data: {
        code: 'A',
        name: 'Artístico',
        description: 'Destaca en creatividad y expresión.',
      },
    });

    const social = await prisma.vocationalCategories.create({
      data: {
        code: 'S',
        name: 'Social',
        description: 'Le gusta ayudar y enseñar a los demás.',
      },
    });

    const entrepreneur = await prisma.vocationalCategories.create({
      data: {
        code: 'E',
        name: 'Emprendedor',
        description: 'Se enfoca en negocios y liderazgo.',
      },
    });

    const conventional = await prisma.vocationalCategories.create({
      data: {
        code: 'C',
        name: 'Convencional',
        description: 'Prefiere la organización y la administración.',
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 1,
        question: '¿Qué tipo de actividades disfrutas más?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Dibujar, pintar o hacer manualidades.',
                categoryId: artistic.id,
              },
              {
                answer: 'Ayudar a las personas en sus problemas.',
                categoryId: social.id,
              },
              {
                answer: 'Armar o reparar cosas.',
                categoryId: realistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 2,
        question: 'Si tuvieras que elegir un trabajo, ¿cuál preferirías?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Ser gerente de una empresa.',
                categoryId: entrepreneur.id,
              },
              {
                answer: 'Trabajar en un laboratorio investigando.',
                categoryId: investigator.id,
              },
              {
                answer: 'Organizar documentos y llevar registros.',
                categoryId: conventional.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 3,
        question: '¿Cómo prefieres resolver problemas?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Hablando con otras personas y colaborando.',
                categoryId: social.id,
              },
              {
                answer: 'Buscando una solución práctica y concreta.',
                categoryId: realistic.id,
              },
              {
                answer: 'Analizando datos y usando la lógica.',
                categoryId: investigator.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 4,
        question: 'En un equipo de trabajo, ¿qué rol prefieres?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Tomar decisiones y liderar.',
                categoryId: entrepreneur.id,
              },
              {
                answer: 'Organizar y asegurarte de que todo esté en orden.',
                categoryId: conventional.id,
              },
              {
                answer: 'Proponer ideas creativas y diferentes.',
                categoryId: artistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 5,
        question: '¿Qué materia te gustaba más en la escuela?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Matemáticas o ciencias.',
                categoryId: investigator.id,
              },
              {
                answer: 'Arte o literatura.',
                categoryId: artistic.id,
              },
              {
                answer: 'Tecnología o educación técnica.',
                categoryId: realistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 6,
        question: '¿En qué ambiente de trabajo te sentirías más cómodo?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'En un hospital o escuela, ayudando a otros.',
                categoryId: social.id,
              },
              {
                answer: 'En un taller o fábrica, construyendo cosas.',
                categoryId: realistic.id,
              },
              {
                answer: 'En una oficina investigando y analizando datos.',
                categoryId: investigator.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 7,
        question: 'Si tuvieras que hacer un proyecto, ¿cómo lo abordarías?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Buscando ideas innovadoras y únicas.',
                categoryId: artistic.id,
              },
              {
                answer: 'Siguiendo un plan detallado y organizado.',
                categoryId: conventional.id,
              },
              {
                answer:
                  'Coordinar a un grupo de personas para lograr el objetivo.',
                categoryId: entrepreneur.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 8,
        question: '¿Qué tipo de libros o revistas te interesan más?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Ciencia, tecnología o investigación.',
                categoryId: investigator.id,
              },
              {
                answer: 'Psicología, relaciones humanas o educación.',
                categoryId: social.id,
              },
              {
                answer: 'Manuales de reparación, ingeniería o mecánica.',
                categoryId: realistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 9,
        question: '¿Cómo prefieres aprender nuevas habilidades?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Siguiendo instrucciones paso a paso.',
                categoryId: conventional.id,
              },
              {
                answer: 'Experimentando y probando cosas nuevas.',
                categoryId: artistic.id,
              },
              {
                answer: 'Escuchando y practicando con otras personas.',
                categoryId: social.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 10,
        question: 'Si pudieras elegir, ¿en qué evento te gustaría participar?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Una conferencia sobre negocios y emprendimiento.',
                categoryId: entrepreneur.id,
              },
              {
                answer: 'Un taller de investigación científica.',
                categoryId: investigator.id,
              },
              {
                answer: 'Un festival de arte o música.',
                categoryId: artistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 11,
        question: '¿Cómo te sientes trabajando con números y cálculos?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Me gusta y se me da bien.',
                categoryId: investigator.id,
              },
              {
                answer: 'Prefiero organizar datos en tablas.',
                categoryId: conventional.id,
              },
              {
                answer: 'No me gusta, prefiero cosas más creativas.',
                categoryId: artistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 12,
        question: '¿Qué tipo de herramientas te gustaría usar en tu trabajo?',
        answers: {
          createMany: {
            data: [
              {
                answer:
                  'Herramientas físicas como máquinas o equipos técnicos.',
                categoryId: realistic.id,
              },
              {
                answer: 'Computadoras y software especializado.',
                categoryId: investigator.id,
              },
              {
                answer: 'No herramientas, prefiero trabajar con personas.',
                categoryId: social.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 13,
        question: 'Si tuvieras que elegir un hobby, ¿cuál te gustaría más?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Tocar un instrumento o escribir.',
                categoryId: artistic.id,
              },
              {
                answer: 'Construir o reparar objetos.',
                categoryId: realistic.id,
              },
              {
                answer: 'Organizar y planear eventos.',
                categoryId: entrepreneur.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 14,
        question: '¿Qué prefieres hacer en tu tiempo libre?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Conversar con amigos o conocer gente nueva.',
                categoryId: social.id,
              },
              {
                answer: 'Leer libros sobre ciencia o tecnología.',
                categoryId: investigator.id,
              },
              {
                answer:
                  'Experimentar con aparatos electrónicos o herramientas.',
                categoryId: realistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 15,
        question: '¿Qué tipo de actividades disfrutas en un trabajo?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Dirigir y tomar decisiones.',
                categoryId: entrepreneur.id,
              },
              {
                answer: 'Mantener el orden y la organización.',
                categoryId: conventional.id,
              },
              {
                answer: 'Investigar y descubrir cosas nuevas.',
                categoryId: investigator.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 16,
        question: '¿Cómo te sientes trabajando en equipo?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Me gusta, disfruto ayudar y colaborar.',
                categoryId: social.id,
              },
              {
                answer: 'Prefiero liderar el equipo.',
                categoryId: entrepreneur.id,
              },
              {
                answer: 'Prefiero trabajar solo en tareas analíticas.',
                categoryId: investigator.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 17,
        question:
          'Si tuvieras que resolver un problema técnico, ¿cómo lo harías?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Desarmando y revisando cada parte del problema.',
                categoryId: realistic.id,
              },
              {
                answer: 'Buscando información y analizando la situación.',
                categoryId: investigator.id,
              },
              {
                answer: 'Siguiendo procedimientos establecidos.',
                categoryId: conventional.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 18,
        question: '¿Cuál de estos trabajos te atrae más?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Psicólogo, maestro, enfermero.',
                categoryId: social.id,
              },
              {
                answer: 'Músico, diseñador, escritor.',
                categoryId: artistic.id,
              },
              {
                answer: 'Técnico, mecánico, ingeniero.',
                categoryId: realistic.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 19,
        question: 'Si tuvieras que invertir dinero, ¿cómo lo harías?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Creando un negocio propio.',
                categoryId: entrepreneur.id,
              },
              {
                answer: 'En un plan financiero seguro.',
                categoryId: conventional.id,
              },
              {
                answer: 'En investigación y desarrollo de tecnología.',
                categoryId: investigator.id,
              },
            ],
          },
        },
      },
    });

    await prisma.vocationalQuestions.create({
      data: {
        position: 20,
        question:
          'Si pudieras elegir cualquier tipo de actividad para un día, ¿qué harías?',
        answers: {
          createMany: {
            data: [
              {
                answer: 'Crear algo artístico o expresar ideas.',
                categoryId: artistic.id,
              },
              {
                answer: 'Ayudar a alguien con un problema.',
                categoryId: social.id,
              },
              {
                answer: 'Organizar un evento o vender un producto.',
                categoryId: entrepreneur.id,
              },
            ],
          },
        },
      },
    });
  });
}

async function main() {
  await seederUsers();
  await seederVocationalTest();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
