import { ISemanas } from '../../interfaces'

/* Dia 2_S4: Elige tus valores */
export const SEM4_D2: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 'rama3_s4_d3',
      needDataFrom: {
        model: 'users',
        columns: ['name', 'children_1_name', 'score'],
      },
    },
    answers: [
      {
        option: 'Si',
        score: 2,
        value: {
          type: 'text',
          body: 'Ya habíamos hablado de tus valores como una gran mujer cuando nos conocimos, ¡vamos a recordarlos hoy!',
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
      body: 'Mencionaste que te identificas con los siguientes valores {{fortress}}.',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
      description: 'guiño',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Míralos de nuevo y piensa en momentos de tu vida en los que estos valores han sido importantes para decidir cómo actuar.',
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
          body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología',
        },
      },
    ],
  },
  {
    category: 'question_voice',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '*¡Recuerda! Por cada nota que envías, ganarás 10 puntos que son más oportunidades de ganar en las rifas que haremos.*\n\nPara grabar una nota de voz en WhatsApp, sigue estos pasos:\n1. Mantén presionado el ícono del micrófono 🎙️ para grabar.\n2. Levanta el dedo para enviar automáticamente.\n3. Si quieres corregir, desliza el dedo a la izquierda para cancelar.',
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
          body: 'Una vez más, mira los valores que elegiste como los más importantes. Te haré unas preguntas de seguimiento. Por favor, dime si son verdaderas o falsas, ¡escoge una opción!. Una vez más, no hay respuestas correctas o incorrectas',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. Mis valores han impactado en mi vida como madre.',
      buttons: [
        {
          title: 'Verdadero',
        },
        {
          title: 'Falso',
        },
      ],
    },
    answers: [
      {
        option: 'Verdadero',
        score: 2,
      },
      {
        option: 'Falso',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '2. En general, trato de vivir como madre bajo estos valores.',
      buttons: [
        {
          title: 'Verdadero',
        },
        {
          title: 'Falso',
        },
      ],
    },
    answers: [
      {
        option: 'Verdadero',
        score: 2,
      },
      {
        option: 'Falso',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '3. Estos valores son una parte muy importante de quien yo soy.',
      buttons: [
        {
          title: 'Verdadero',
        },
        {
          title: 'Falso',
        },
      ],
    },
    answers: [
      {
        option: 'Verdadero',
        score: 2,
      },
      {
        option: 'Falso',
        score: 2,
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estos valores [VALUESPRIME_TEXT_1…N] te han llevado a ser cada vez una mejor mamá para tu bebé.',
    },
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
