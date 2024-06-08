import { ISemanas } from '../../interfaces'

/* Día 2_S7: DIA 2_S7: Reflexión sobre tu legado */

export const SEM7_D2: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's2_d2',
      needDataFrom: {
        model: 'users',
        columns: ['name'],
      },
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana siga muy bien! 😊',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Amiga! Me imagino como te puedes sentir y está muy bien que lo expreses, recuerda que a veces un mal día nos pasa a todas, confiemos en que esta será una mejor semana ❤️',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Siento mucho que estés así! ¡Espero que tu semana mejore y que conversar conmigo hoy te suba el ánimo! ❤️',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Recuerda que, si necesitas que alguien te escuche, siempre está la opción de que hables con una persona experta en psicología, escribe “*APOYO*” para canalizarte a programar una llamada con ella.',
    },
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
          body: 'Hoy tengo una pequena encuesta para ti. Si decides participar de la encuesta podrás ser parte de un sorteo! ✨🏆',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '*¿Lista para ganar puntos y aprender JUNTAS?*\n\nA. ¡Listísima! 😎\nB. Algo lista ¡pero adelante! 😆',
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
        score: 2,
        value: {
          type: 'text',
          body: 'Solo por responder cada pregunta, ganarás 5 puntos por respuesta, ¡no importa si te falla alguna! Pero por cada respuesta que sea correcta te llevarás un punto extra y a mas puntos,  más oportunidades de ganar el sorteo!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Solo por responder cada pregunta, ganarás 5 puntos por respuesta, ¡no importa si te falla alguna! Pero por cada respuesta que sea correcta te llevarás un punto extra y a mas puntos,  más oportunidades de ganar el sorteo!',
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
          body: '*¡Empecemos!*',
        },
      },
    ],
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
      type: 'text',
      body: 'Amiga, queremos tomar un momento para preguntar sobre tí. 🤗',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Durante las últimas 2 semanas, ¿qué tan seguido has tenido molestias debido a los siguientes problemas?',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '1. Poco interés o placer en hacer cosas\n\nA. Ningún día\nB.Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
      },
      {
        option: 'B',
        score: 2,
      },
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '2. Te has sentido decaída, deprimida o sin esperanzas\n\nA. Ningún día\nB.Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: 'Gracias por tu sinceridad 👏',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Gracias por tu sinceridad 👏',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: 'Gracias por tu sinceridad 👏',
        },
      },
      {
        option: 'D',
        score: 2,
        value: {
          type: 'text',
          body: 'Gracias por tu sinceridad 👏',
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
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['score'],
      },
      type: 'text',
      body: '¡Concluimos el reto del día! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas y ayudar a una amiga! Te escribiré pronto con los resultados de la rifa',
    },
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
          body: 'Amiga, quisiera tomar el resto de este día para que reflexionemos sobre qué quieres heredarle a tus hijos',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Tu legado son cosas bien grandes, ¡tan grandes que no caben en ningún lugar! Sobre tus valores, sobre cómo enfrentar la vida, sobre cómo mantener al cuerpo sano y sobre el amor hacia tus hijos',
    },
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
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D2-A1.aac',
          description: 'S7D2_A1',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Qué te pareció el audio? ¿Estás de acuerdo con que nuestra herencia para nuestros bebés se verá reflejada en ellos por mucho tiempo?',
      buttons: [
        {
          title: 'Si',
        },
        {
          title: 'No',
        },
      ],
    },
    answers: [
      {
        option: 'Si',
        score: 2,
        value: {
          type: 'text',
          body: 'Ahora, es momento de compartir. En una nota de audio, cuéntame cuál es tu legado para tus hijos. Piensa en las siguientes cosas que pueden ser lo que le heredes a tus hijos:',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: 'Ahora, es momento de compartir. En una nota de audio, cuéntame cuál es tu legado para tus hijos. Piensa en las siguientes cosas que pueden ser lo que le heredes a tus hijos:',
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
        columns: ['fortress'],
      },
      type: 'text',
      body: '✅ Mis valores principales son *{{fortress}}*. ¿Me gusta vivir mi vida con estos valores? ¿Estos valores me ayudan a afrontar las distintas situaciones con las que me encuentro?\n✅ ¿Considero que soy una persona  dispuesta a ampliar mis conocimientos? ¿Trato de aplicar las tres AAA en mi vida diaria? ¿Atiendo, Aprendo y Adapto de todo el conocimiento que me llega de otros?\n✅ ¿Cuido su salud para que, a futuro, él crezca sano, fuerte, inteligente y también sepa cuidarse, incluso cuando yo ya no esté cerca para cuidarlo todo el tiempo?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Grabar una nota de voz es una herramienta que a mí me sirve para expresarme y ordenar mis ideas y emociones.  ¡Cuéntame cuál es tu legado y gana 10 puntos también por compartir!',
    },
  },
  {
    category: 'question_voice',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: 'Durante el tiempo que estaremos realizando actividades, estas notas de voz te ayudarán a reflexionar por ti misma sobre tus ideas y emociones para sentirte mejor. *¡Recuerda! Por cada nota que envías, ganarás 10 puntos que son más oportunidades de ganar en las rifas que haremos.*\n\n*Para grabar una nota de voz en WhatsApp, sigue estos pasos:*\n1. Mantén presionado el ícono del micrófono 🎙️ para grabar.\n2. Levanta el dedo para enviar automáticamente.\n3. Si quieres corregir, desliza el dedo a la izquierda para cancelar.',
    },
    answers: [
      {
        option: 'voice',
        score: 10,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu mensaje amiga!, lo escucharé pronto!\n¡Estoy segura de que tu herencia para tus hijos será muy útil y valiosa para ellos!',
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
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['name', 'score'],
      },
      type: 'text',
      body: '¡Termina el reto del día, *{{name}}*! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas! Recuerda, entre más puntos, ¡más chances de ganar en las rifas! Sigamos aprendiendo JUNTAS para ser las mejores mamás. ¡Te escribo pronto!',
    },
  },
]
