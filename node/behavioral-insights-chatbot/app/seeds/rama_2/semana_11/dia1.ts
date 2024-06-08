import { ISemanas } from '../../interfaces'
/* Semana 11: Apego / Juntina y Juntino
 */

/* Día 1_S11: A la hora de comer
 */

export const SEM11_D1: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's11_d1',
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
          body: '¡Hola amiga! Hoy vamos a hablar de la importancia de tener un ambiente agradable a la hora de alimentar al bebé. Escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S11-D1-A1.aac',
      description: 'S11D1_A1',
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
          body: 'Si tuviéramos que darle una serie de consejos a una nueva mamá sobre cómo empezar a darle de comer al bebé que ya puede comer comiditas aparte de leche materna, ¿Qué le diríamos sobre el ambiente?',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S11-D1-A2.aac',
      description: 'S11D1_A2',
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
          body: 'Ahora sí: graba una breve nota de voz para una nueva mamá que quiere tener las mejores recomendaciones para la hora de la comida!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología',
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
        columns: ['name', 'score', 'children_1_name'],
      },
      type: 'text',
      body: '¡Concluimos el reto del día! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas y ayudar a una amiga! Recuerda, entre más puntos, ¡Más chances de ganar soles en cada una de las dos rifas!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '_*Mi consejo:* si estás preocupada por la nutrición de tu bebé, escríbeme para programar una llamada de 20 minutos. Tu llamada será confidencial. Escribe “CONSULTA” si lo necesitas_',
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
