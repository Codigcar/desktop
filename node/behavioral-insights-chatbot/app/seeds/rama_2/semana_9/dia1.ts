import { ISemanas } from '../../interfaces'

/* Semana 9: Alimentación responsiva / Grupos de apoyo social, Sole */
/* Dia 1_S9: Alimentación responsiva */

export const SEM9_D1: ISemanas[] = [
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
          body: '¡Me da gusto amiga! ¡Espero que sigamos progresando en nuestra sabiduría como mamás!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Me da gusto amiga! ¡Espero que sigamos progresando en nuestra sabiduría como mamás!',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Me da gusto amiga! ¡Espero que sigamos progresando en nuestra sabiduría como mamás!',
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
          body: 'Te cuento: Alimentar correctamente va más allá de la leche materna y los alimentos. ¡Vamos a revisar como es el momento en que alimentamos a nuestro bebe!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A1.aac',
      description: 'S9D1_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/v1702505968/p9i6kgovzu8gqayza7le.webp',
      description: 'familia.sticker',
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
          body: 'Tu misión de esta semana es ayudar a Sole a encontrar la respuesta correcta para cada pregunta. Cada pregunta tiene opciones, una es mejor que las otras. En cada una, ¿cuál crees que es la correcta? ¡Ayuda a Sole y gana puntos por cada respuesta!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Escucha lo que le sucedió a Sole:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A2.aac',
      description: 'S9D1_A2',
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
          body: 'Ahora escucha mi consejo:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A3.aac',
      description: 'S9D1_A3',
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
          body: '¡Ahora ayudame!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'a resolver las dudas de Sole! Ganarás 2 puntos por cada respuesta y 1 punto extra si atinas a la correcta',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. ¿Cómo saber si un bebe de 0-6 meses está llenito?\n\nA. Disminuye o para de succionar, escupe el pezón, aprieta los labios, voltea la cabeza o se queda dormido.\nB. Regresa la leche o vomita y llora.\nC. Voltea la cabeza y se pone inquieto.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A4.aac',
          description: 'S9D1_A4',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A5.aac',
          description: 'S9D1_A5',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A5.aac',
          description: 'S9D1_A5',
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
          body: '¡Muy bien!',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '2. ¿Cómo saber si un bebe de 6-8 meses está llenito?\n\nA. Se mueve mucho y quiere ponerse a jugar.\nB. Se talla la carita como con sueño y escupe la comida.\nC. Come más lento y empuja la comida hacia afuera o cierra los labios.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A6.aac',
          description: 'S9D1_A6',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A6.aac',
          description: 'S9D1_A6',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A7.aac',
          description: 'S9D1_A7',
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
          body: '¡Muy bien!',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '3. ¿Cómo saber si un bebe de 9-12 meses, como el de Sole, está llenito?\n\nA. Llora y se pone inquieto, aventando la comida.\nB. Cierra los labios, empuja la comida y sacude la cabeza indicando “no más”.\nC. Se aburre y pierde interés en la comida, se voltea.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A8.aac',
          description: 'S9D1_A8',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A9.aac',
          description: 'S9D1_A9',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A8.aac',
          description: 'S9D1_A8',
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
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '4. Ahora, veamo repasemos cómo reconocer algunas señales de nuestros bebés cuando tienen hambre: ¿cómo saber si un bebe lactante de 0-6 meses tiene hambre?\n\nA. Un bebecito con hambre se queda dormido.\nB. Algunas señales tempranas de hambre se ve emocionado, abre la boquita y gira la cabeza como buscando comida. poco a poco pone la manita en la boca y si está  con mucha hambre, llora enrojecido y se mueve mucho.\nC. Mueve mucho la cabeza y el cuerpo indicando que está inquieto.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A10.aac',
          description: 'S9D1_A10',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A11.aac',
          description: 'S9D1_A11',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A10.aac',
          description: 'S9D1_A10',
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
          body: 'Veamos la siguiente pregunta',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '5. ¿Cómo saber si un bebe 6-8 meses tiene hambre? \n\nA. Pide comida con expresiones de la mano o cara.\nB. Llora y se pone inquieto.\nC. Señala la comida, acerca la cabeza a la cuchara y quiere alcanzar la comida o intenta llevar la comida a la boca.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A12.aac',
          description: 'S9D1_A12',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A12.aac',
          description: 'S9D1_A12',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A13.aac',
          description: 'S9D1_A13',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '6. ¿Cómo saber si un bebe 9-12 meses tiene hambre, como el bebé de Sole?\n\nA. Se emociona al ver la comida, la señala, quiere alcanzarla, y expresa su deseo con alimentos específicos con sonidos o palabras.\nB. Se inquieta al ver la comida y se mueve mucho.\nC. Llora o te pide la comida con sonidos o palabras.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A14.aac',
          description: 'S9D1_A14',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A15.aac',
          description: 'S9D1_A15',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D1-A16.aac',
          description: 'S9D1_A16',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Muchas gracias por tu ayuda amiga!',
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
          body: '¡Muy bien!',
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
      body: 'Concluimos el reto del día! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas y ayudar a una amiga! Recuerda, entre más puntos, ¡Más chances de ganar soles en cada una de las dos rifas!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Mi consejo: si estás proecupada por la nutrición de tu bebé, escríbeme para programar una llamada de 20 minutos. Tu llamada será confidencial. Escribe “*CONSULTA*” si lo necesitas',
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
