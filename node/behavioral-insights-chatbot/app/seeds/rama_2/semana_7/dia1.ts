import { ISemanas } from '../../interfaces'

/* Día 1_S7: Quiz de repaso mensajes clave */

export const SEM7_D1: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's7_d1',
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: 'Ya hemos avanzado mucho en nuestro camino para aprender más cosas para ser mejores mamás y cuidar a nuestras y nuestros hijos! Hoy, vamos a hacer un pequeño repaso de tooodo lo que hemos aprendido. Al final de este breve cuestionario, verás lo mucho que hemos avanzado',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Ya hemos avanzado mucho en nuestro camino para aprender más cosas para ser mejores mamás y cuidar a nuestras y nuestros hijos! Hoy, vamos a hacer un pequeño repaso de tooodo lo que hemos aprendido. Al final de este breve cuestionario, verás lo mucho que hemos avanzado',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Siguiente mensaje?',
      buttons: [
        {
          title: '👍',
        },
      ],
    },
    answers: [
      {
        option: '👍',
        score: 2,
        value: {
          type: 'text',
          body: 'Solo por responder cada pregunta, ganarás 5 puntos por respuesta, ¡no importa si te falla alguna! Pero por cada respuesta que sea correcta te llevarás un punto extra y ¡esto son más oportunidades de ganar en las rifas!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '*¡Empecemos!*',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. Cuando la/el bebé tiene de 0 a 6 meses de edad, ¿qué alimento hay que darle?\n\nA. Lo mejor es la leche materna pues tiene todo lo que tu bebé necesita.\nB. B. Cosas líquidas en general o muy moliditas.\nC. Agüitas, agua simple y leche materna.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A1.aac',
          description: 'S7D1_A1',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A2.aac',
          description: 'S7D1_A2',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A2.aac',
          description: 'S7D1_A2',
        },
      },
    ],
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '2. ¿Recuerdas qué significa cuando el bebé de Marita se ve así, emocionado, con la boquita abierta, o girando la cabeza como buscando?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2D2_I_1.jpeg',
      description: 'bebes',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Elige la opción correcta\n\nA. “Estoy curioso”\nB. “Tengo muchísima hambre”\nC. “Tengo hambre”',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A3.aac',
          description: 'S7D1_A3',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A3.aac',
          description: 'S7D1_A3',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A4.aac',
          description: 'S7D1_A4',
        },
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '3. ¿Recuerdas qué alimentos necesita comer a diario tu bebé desde los 6 meses para seguir creciendo sanos, fuertes y muy inteligentes?\n\nA. Sólo alimentos de origen animal, como higadito, sangrecita, pescado y pollo.\nB. Sólo alimentos  como frutas y verduras de colores.\nC. Alimentos de origen animal, frutas y verduras de colores variados, menestras como habas, arvejas, lentejas, e incorporar agua segura.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A5.aac',
          description: 'S7D1_A5',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A5.aac',
          description: 'S7D1_A5',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A6.aac',
          description: 'S7D1_A6',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '4. ¿Recuerdas si los bebés deben ir comiendo menos machacado y del plato propio conforme van creciendo?\n\nA. Idealmente, hasta los dos años de edad los bebés deberían comer todo aplastado o trituradito, y la mamá o alguien más debería darles de comer siempre.\nB. Sí. Desde los 6 meses, debería empezar a ofrecer comidas espesas como puré, papillas o mazamorras. A partir de los 8 meses, puede pasar a alimentos triturados. Además, los bebés deben tener su propio plato, cuchara y vaso y dejarle tomar los alimentos por sí mismos poco a poco.\nC. Depende de a qué edad le salgan los primeros dientes. Si no les han salido dientes al año, deberíamos darles solo sopitas o calditos.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A7.aac',
          description: 'S7D1_A7',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A8.aac',
          description: 'S7D1_A8',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A7.aac',
          description: 'S7D1_A7',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '5. ¿Cuántas cucharadas de comida espesa al día deberían comer los bebés a partir de los 6 meses de edad?\n\nA. Medio plato mediano de comida espesa, que son 3 a 5 cucharadas, y debe ir aumentando conforme crece; también debe seguir tomando leche materna.\nB. Solo 2 cucharadas de comida espesa es suficiente mientras también siga tomando leche materna.\nC. Tres cuartas parte de un plato mediano de comida espesa, que son 5 a 7 cucharadas de comida espesa.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A9.aac',
          description: 'S7D1_A9',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A10.aac',
          description: 'S7D1_A10',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A10.aac',
          description: 'S7D1_A10',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '6. De acuerdo a las recomendaciones nacionales de prevención de anemia, ¿cómo hacemos para reforzar la alimentación de tu bebé con hierro?\n\nA. partir de los 4 meses de edad hay que darle los suplementos (gotitas) a diario, a la misma hora, hasta los 6 meses. A esta edad, hay que hacer el despistaje de anemia y, si el bebé está sano, hay que darle los sobres de micronutrientes (chispitas) durante 12 meses, agregando el contenido de un sobre en una de sus comidas. ¡Son una buena alternativa para prevenir la anemia y mantenerlo sano!.\nB. Cuando le hagan el despistaje de anemia, a los 6 meses de edad, el médico decidirá si requiere suplementos o micronutrientes.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A11.aac',
          description: 'S7D1_A11',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A12.aac',
          description: 'S7D1_A12',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '7. De acuerdo a las recomendaciones nacionales, ¿Recuerdas cada cuánto tienes que llevar a tu bebé a las citas de Control de Crecimiento y Desarrollo (Citas CRED) en los primeros 12 meses de vida?\n\nA. Tiene que ir semanalmente en el primer mes de nacido, y luego cada mes hasta cumplir los 12 meses.\nB. Tiene que ir cada 2 meses: 2, 4, 6, 8, 10 y 12 meses porque coincide con algunas puestas de vacunas y con la toma de pruebas para descartar anemia.\nC. Tiene que ir cada vez que haya alguna complicación con la salud del bebé pero no es necesario ir más allá de eso.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A13.aac',
          description: 'S7D1_A13',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A14.aac',
          description: 'S7D1_A14',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A14.aac',
          description: 'S7D1_A14',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '8. ¿Recuerdas cuál es la principal razón por la que debemos vacunar a nuestros bebés?\n\nA. Sirven para cumplir con la cartilla de vacunación y así no perder los beneficios de JUNTOS.\nB. Realmente no son tan importantes porque los bebés pueden obtener defensas por sí solos conforme crecen; algunas vacunas hasta podrían ser dañinas.\nC. Las vacunas nos ayudan a protegerlos de enfermedades que se pueden prevenir, y que pueden dañar la salud y desarrollo de nuestros bebés en el corto y largo plazo.',
      buttons: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A15.aac',
          description: 'S7D1_A15',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A15.aac',
          description: 'S7D1_A15',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D1-A16.aac',
          description: 'S7D1_A16',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['name', 'score', 'children_1_name'],
      },
      type: 'text',
      body: '¡Concluimos el reto del día! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas y ayudar a una amiga! Recuerda, entre más puntos, ¡Más chances de ganar en cada una de las dos rifas!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '_*Mi consejo:* si estás preocupada por la nutrición de tu bebé, escríbeme para programar una llamada de 20 minutos. Tu llamada será confidencial. Escribe *CONSULTA* si lo necesitas_',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Sigamos participando JUNTAS para aprender más de nutrición y cuidados para nuestros bebés. ¡Nos vemos pronto!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
      description: 'guiño_png',
    },
  },
]
