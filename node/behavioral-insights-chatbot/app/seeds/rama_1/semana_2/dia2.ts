import { ISemanas } from '../../interfaces'

export const SEM2_D2: ISemanas[] = [
  // {
  //     category: 'template',
  //     body: 'hello_world',
  //     is_waiting_answer: true,
  //     value: {
  //       type: 'template',
  //       body: 'hello_world',
  //     },
  //     answers: [
  //       {
  //         option: 'A',
  //         score: 2,
  //         value: {
  //           type: 'text',
  //           body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana siga muy bien!',
  //         },
  //       },
  //       {
  //         option: 'B',
  //         score: 2,
  //         value: {
  //           type: 'text',
  //           body: 'Amiga! Recuerda que a veces un mal día nos pasa a todas pero la semana siempre puede mejorar <3 ',
  //         },
  //       },
  //       {
  //         option: 'C',
  //         score: 2,
  //         value: {
  //           type: 'text',
  //           body: '¡Siento mucho que estés así! ¡Espero que tu semana mejore y que conversar conmigo hoy te suba el ánimo!',
  //         },
  //       },
  //     ],
  //   },
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por cierto, ¿Recuerdas a Marita? ¡Le está yendo muy bien! pero me envió este audio',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D2-A1.aac',
      description: 'S2D2_A1',
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
          body: 'Marita dijo: “Yo siento que como madre debo priorizar a mi bebé y no debería importar si a veces yo no tengo tiempo de comer y descansar un poco.”',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Qué le dirías a Marita? ¡Escoge una opción!\n\nA. “¡No, amiga! Aunque es normal sentirse así, una buena mamá pone primero su bienestar físico y emocional para poder darle lo mejor y toda la salud a sus bebés, especialmente a través de su leche, pues por ahí pasa todo. Si la mamá no está bien, no puede nutrir bien a su bebé\n\nB. “Amiga, a veces es muy difícil atender a la familia y hacer todas las labores que debemos hacer en nuestro rol de buenas madres y encargadas de la casa. Ante esa situación, los hijos siempre son primero, sin importar otra cosa.”',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D2-A2.aac',
          description: 'S2D2_A2',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D2-A3.aac',
          description: 'S2D2_A3',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Amiga, ahora hablemos sobre el estres que Marita siente cuando va a amamantar. Escucha mi audio.',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D2-A4.aac',
      description: 'S2D2_A4',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Estás lista para escuchar mi secreto?',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D2-A5.aac',
          description: 'S2D2_A5',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Espero que te haya gustado! Intenta hacer este ejercicio todos los días por 5-10 minutos.',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¿Quieres ganar 10 puntos más? Recogeré mensajes de voz para que puedan ayudar a otras mujeres como tú que han sido mamás hace poco!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Envía un mensaje de voz a Marita dándole ánimos y cuéntale de una vez que superaste algo difícil como mamá 🙂',
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
