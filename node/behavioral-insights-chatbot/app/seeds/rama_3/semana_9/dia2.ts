import { ISemanas } from '../../interfaces'

/* Semana 9: Alimentación responsiva / Grupos de apoyo social, Sole */
/* Dia 1_S9: Alimentación responsiva */

export const SEM9_D2: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's9_d1',
      needDataFrom: {
        model: 'users',
        columns: ['name', 'children_1_name', 'score'],
      },
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: 'Hoy, vamos a hablar de la importancia de tener amigas y hablar con ellas',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A1.aac',
      description: 'S9D2_A1',
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
          body: 'Esta semana quiero presentarte a mi amiga Sole. Ella se mudó justo antes de dar a luz a su bebé',
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
          body: 'Tu misión de esta semana es ayudar a Sole a encontrar la respuesta correcta para cada pregunta. Cada pregunta tiene opciones, una es mejor que las otras. En cada una, ¿cuál crees que es la correcta? *¡Ayuda a Sole y gana puntos por cada respuesta!*',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora escucha el audio de Sole:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A2.aac',
      description: 'S9D2_A2',
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
          body: 'Escucha mi consejo:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A3.aac',
      description: 'S9D2_A3',
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
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. ¿Crees que tener amistades puede ayudarte a ser una mejor mamá para tu bebé?\n\nA. Sí. Tener un círculo de amistades puede ayudarme a conversar mis problemas, ayudarnos mutuamente a resolverlos, o simplemente distraernos para recargar energías y volver a casa a ser mejores mamás con nuestros bebés.\nB. No. Aunque es bonito tener amistades, una tiene que elegir como madre primero estar con nuestros bebés y luego lo demás. Las amistades pueden distraer de las obligaciones que una tiene cuando se vuelve madre.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A4.aac',
          description: 'S9D2_A4',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A5.aac',
          description: 'S9D2_A5',
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
          body: 'Siguiente pregunta',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '2. ¿De quién debe ser la responsabilidad de cuidar al bebé en el hogar?\n\nA. Principalmente, debe ser la madre porque ella es quien dio a luz, lo ha cuidado desde pequeño y ella es quien mejor puede conocer las necesidades de su bebé.\nB. Aunque la madre está más en contacto con el bebé, la responsabilidad no tiene que ser de ella sola: con práctica, los padres pueden ser igual de buenos cuidando aunque no siempre estén en casa. Que haya más de un cuidador para que el bebé tenga una mejor red de protección y se pueda rotar el cuidado.',
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
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A6.aac',
          description: 'S9D2_A6',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D2-A7.aac',
          description: 'S9D2_A7',
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
          body: '¿Qué consejo le darías a Sole? Por 10 puntos, graba un mensaje de ánimos',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. *Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología*',
    },
  },
  {
    category: 'question_voice',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '*¡Recuerda! Por cada nota que envías, ganarás 10 puntos que son más oportunidades de ganar en las rifas que haremos.*\n\n*Para grabar una nota de voz en WhatsApp, sigue estos pasos:*\n1. Mantén presionado el ícono del micrófono 🎙️ para grabar.\n2. Levanta el dedo para enviar automáticamente.\n3. Si quieres corregir, desliza el dedo a la izquierda para cancelar.',
    },
    answers: [
      {
        option: 'voice',
        score: 10,
        value: {
          type: 'text',
          body: '¡Muchas gracias por compartir esto conmigo, amiga! Recuerda que yo no podré responder a tu audio, ¡pero será una herramienta muy buena para ti! ¡Has ganado 10 puntos!',
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
        columns: ['name', 'score'],
      },
      type: 'text',
      body: 'Concluimos el reto del día, *{{name}}*! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas! Recuerda, entre más puntos, ¡más chances de ganar en las rifas! Sigamos aprendiendo JUNTAS para ser las mejores mamás. ¡Te escribo el viernes!',
    },
  },
]
