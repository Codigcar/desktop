import { ISemanas } from '../../interfaces'

/* Dia 2_S4: Elige tus valores */
export const SEM4_D2: ISemanas[] = [
  // {
  //   category: 'template',
  //   body: 'hello_world',
  //   is_waiting_answer: true,
  //   value: {
  //     type: 'template',
  //     body: 'hello_world',
  //   },
  //   answers: [
  //     {
  //       option: 'A',
  //       score: 2,
  //       value: {
  //         type: 'text',
  //         body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana siga muy bien!',
  //       },
  //     },
  //     {
  //       option: 'B',
  //       score: 2,
  //       value: {
  //         type: 'text',
  //         body: 'Amiga! Recuerda que a veces un mal día nos pasa a todas pero la semana siempre puede mejorar <3 ',
  //       },
  //     },
  //     {
  //       option: 'C',
  //       score: 2,
  //       value: {
  //         type: 'text',
  //         body: '¡Siento mucho que estés así! ¡Espero que tu semana mejore y que conversar conmigo hoy te suba el ánimo! ❤️',
  //       },
  //     },
  //   ],
  // },
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
          body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana siga muy bien!',
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Hola amiga! Ya habíamos hablado de tus valores como una gran mujer cuando nos conocimos, ¡vamos a recordarlos hoy!',
    },
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por favor, piensa en estos tres valores y graba una breve nota de voz en la que me cuentes los pensamientos y sentimientos que se te vinieron a la mente al considerar estos valores.',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología.',
    },
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
          body: 'Una vez más, mira los valores que elegiste como los más importantes. Te haré unas preguntas de seguimiento. Por favor, dime si son verdaderas o falsas, ¡escoge una opción!. Una vez más, no hay respuestas correctas o incorrectas.',
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
      /* needDataFrom: {
        model: 'user_messages',
        from_question:'¿Te gustaría ponerte una meta del número de veces que harás estos ejercicios durante la semana? ¡Darnos tiempo de hacerlos nos hará sentir mejor! Escoge una de las opciones:',
        module: 3,
        columns: ['message'],
      }, */
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
