import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await seederUsers();
  await seederVocationalTest();
  // *: Seed Psychological Test
  await createLikertScales();
  await createPsychologicalDimensions();
  await createPsychologicalQuestions();
  await createInterpretationPsychologicalTest();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

async function seederUsers() {
  await prisma.$transaction(async (prisma) => {
    await prisma.users.create({
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

    await prisma.users.create({
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
  });
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

async function createLikertScales() {
  const scales = [
    { name: 'Totalmente en desacuerdo', value: 1 },
    { name: 'En desacuerdo', value: 2 },
    { name: 'Ni de acuerdo ni en desacuerdo', value: 3 },
    { name: 'De acuerdo', value: 4 },
    { name: 'Totalmente de acuerdo', value: 5 },
  ];

  await prisma.likertScales.createMany({
    data: scales,
  });
}

async function createPsychologicalDimensions() {
  const dimensions = [
    {
      name: 'Control Personal',
      description:
        'Evaluación de la percepción sobre la influencia en la vida y entorno',
      position: 1,
    },
    {
      name: 'Seguridad Personal',
      description: 'Percepción de confianza y seguridad en sí mismo',
      position: 2,
    },
    {
      name: 'Relaciones Sociales',
      description:
        'Satisfacción con las interacciones sociales y el apoyo recibido',
      position: 3,
    },
    {
      name: 'Autonomía',
      description:
        'Capacidad para tomar decisiones y actuar de forma independiente',
      position: 4,
    },
  ];

  await prisma.psychologicalDimensions.createMany({
    data: dimensions,
  });
}

async function createPsychologicalQuestions() {
  const questionsByDimension = {
    'Control Personal': [
      {
        question: 'Me siento capaz de tomar decisiones importantes en mi vida.',
        position: 1,
      },
      {
        question:
          'Creo que tengo el control sobre los eventos que ocurren en mi vida.',
        position: 2,
      },
      {
        question: 'Siento que mi opinión es valorada por los demás.',
        position: 3,
      },
      {
        question: 'Me esfuerzo por mejorar mi vida y alcanzar mis metas.',
        position: 4,
      },
    ],
    'Seguridad Personal': [
      { question: 'Me siento seguro/a sobre el futuro.', position: 5 },
      {
        question: 'Confío en mis habilidades para enfrentar problemas.',
        position: 6,
      },
      { question: 'Me siento satisfecho/a con mi vida actual.', position: 7 },
      {
        question: 'No me preocupa en exceso lo que sucederá mañana.',
        position: 8,
      },
    ],
    'Relaciones Sociales': [
      {
        question: 'Tengo personas en quienes confiar cuando lo necesito.',
        position: 9,
      },
      {
        question: 'Siento que pertenezco a un grupo de amigos o familia.',
        position: 10,
      },
      { question: 'Disfruto de la compañía de los demás.', position: 11 },
      {
        question: 'Me siento apreciado/a por las personas cercanas a mí.',
        position: 12,
      },
    ],
    Autonomía: [
      {
        question:
          'Puedo desenvolverme bien en mi vida diaria sin ayuda constante.',
        position: 13,
      },
      {
        question:
          'Me siento capaz de manejar mis responsabilidades personales.',
        position: 14,
      },
      {
        question: 'Me gusta hacer cosas por mi cuenta sin depender de otros.',
        position: 15,
      },
      {
        question: 'No necesito que otros tomen decisiones por mí.',
        position: 16,
      },
    ],
  };

  const dimensions = await prisma.psychologicalDimensions.findMany();

  for (const dimension of dimensions) {
    const questions = questionsByDimension[`${dimension.name}`] as {
      question: string;
      position: number;
    }[];

    if (questions) {
      for (const q of questions) {
        await prisma.psychologicalQuestions.create({
          data: {
            question: q.question,
            dimensionId: dimension.id,
            position: q.position,
          },
        });
      }
    }
  }
}

async function createInterpretationPsychologicalTest() {
  const levels = [
    { min: 0, max: 20, level: 'muy bajo' },
    { min: 20, max: 40, level: 'bajo' },
    { min: 40, max: 60, level: 'moderado' },
    { min: 60, max: 80, level: 'alto' },
    { min: 80, max: 101, level: 'muy alto' },
  ];

  await prisma.interpretationLevels.createMany({
    data: levels,
  });

  const interpretations = [
    {
      dimensionId: 1,
      levelId: 1,
      description:
        'Indica una percepción muy limitada de control sobre la vida y las decisiones. Puede experimentar sentimientos de impotencia.',
    },
    {
      dimensionId: 1,
      levelId: 2,
      description:
        'Sugiere dificultades para sentirse en control de las decisiones y eventos importantes de la vida.',
    },
    {
      dimensionId: 1,
      levelId: 3,
      description:
        'Refleja una capacidad moderada para tomar decisiones e influir en su vida, aunque con algunas limitaciones.',
    },
    {
      dimensionId: 1,
      levelId: 4,
      description:
        'Indica una buena percepción de control sobre las decisiones y eventos en su vida, con confianza en su capacidad de influencia.',
    },
    {
      dimensionId: 1,
      levelId: 5,
      description:
        'Refleja una excelente percepción de control e influencia sobre su vida y entorno, con gran confianza en la toma de decisiones.',
    },
    {
      dimensionId: 2,
      levelId: 1,
      description:
        'Indica niveles muy altos de inseguridad y preocupación sobre el futuro y baja confianza en las propias habilidades.',
    },
    {
      dimensionId: 2,
      levelId: 2,
      description:
        'Sugiere preocupaciones significativas sobre el futuro y limitada confianza en las propias capacidades.',
    },
    {
      dimensionId: 2,
      levelId: 3,
      description:
        'Refleja un equilibrio entre confianza y preocupación, con satisfacción moderada con la vida actual.',
    },
    {
      dimensionId: 2,
      levelId: 4,
      description:
        'Indica buena confianza en las propias habilidades y una visión generalmente positiva del futuro.',
    },
    {
      dimensionId: 2,
      levelId: 5,
      description:
        'Refleja una gran seguridad en sí mismo, optimismo sobre el futuro y alta satisfacción con la vida actual.',
    },
    {
      dimensionId: 3,
      levelId: 1,
      description:
        'Indica aislamiento social significativo y ausencia de apoyo social percibido.',
    },
    {
      dimensionId: 3,
      levelId: 2,
      description:
        'Sugiere conexiones sociales limitadas y poco satisfactorias, con escaso apoyo percibido.',
    },
    {
      dimensionId: 3,
      levelId: 3,
      description:
        'Refleja relaciones sociales adecuadas pero con algunas limitaciones en la profundidad o calidad.',
    },
    {
      dimensionId: 3,
      levelId: 4,
      description:
        'Indica buenas conexiones sociales, con presencia de personas de confianza y sentido de pertenencia.',
    },
    {
      dimensionId: 3,
      levelId: 5,
      description:
        'Refleja excelentes relaciones sociales, con fuerte apoyo percibido, conexiones significativas y alto sentido de pertenencia.',
    },
    {
      dimensionId: 4,
      levelId: 1,
      description:
        'Indica una dependencia muy alta de otros para la toma de decisiones y actividades diarias.',
    },
    {
      dimensionId: 4,
      levelId: 2,
      description:
        'Sugiere dificultades significativas para actuar de forma independiente y necesidad frecuente de ayuda.',
    },
    {
      dimensionId: 4,
      levelId: 3,
      description:
        'Refleja un equilibrio entre independencia y dependencia en diferentes áreas de la vida.',
    },
    {
      dimensionId: 4,
      levelId: 4,
      description:
        'Indica buena capacidad para desenvolverse de manera independiente en la mayoría de situaciones.',
    },
    {
      dimensionId: 4,
      levelId: 5,
      description:
        'Refleja una excelente capacidad para manejar responsabilidades de forma independiente y tomar decisiones autónomas.',
    },
  ];

  await prisma.dimensionInterpretations.createMany({
    data: interpretations,
  });

  const overallInterpretations = [
    {
      percentage: 20,
      description:
        'Los resultados indican un nivel muy bajo de bienestar psicológico general. Podría beneficiarse significativamente de intervenciones y apoyo especializado para mejorar su calidad de vida y bienestar emocional.',
    },
    {
      percentage: 40,
      description:
        'Los resultados muestran un nivel bajo de bienestar psicológico. Se recomienda explorar áreas específicas de mejora, especialmente en las dimensiones con menor puntuación.',
    },
    {
      percentage: 60,
      description:
        'Los resultados reflejan un nivel moderado de bienestar psicológico. Existe un equilibrio en varias áreas, aunque hay oportunidades para fortalecer aspectos específicos.',
    },
    {
      percentage: 80,
      description:
        'Los resultados indican un nivel alto de bienestar psicológico general. Hay fortalezas significativas en varias dimensiones, lo que contribuye a una buena calidad de vida.',
    },
    {
      percentage: 101,
      description:
        'Los resultados muestran un nivel muy alto de bienestar psicológico. Hay excelentes fortalezas en las diversas dimensiones evaluadas, lo que refleja una gran satisfacción y adaptación psicológica.',
    },
  ];

  await prisma.overallInterpretations.createMany({
    data: overallInterpretations,
  });
}
