import { ISemanas } from '../../interfaces'

/* Día 2_S5: ¿Quién está en tu equipo? */
export const SEM5_D2: ISemanas[] = [
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
      body: 'Recuerda que, si necesitas que alguien te escuche, siempre está la opción de que hables con una persona experta en psicología, escribe *APOYO* para canalizarte a programar una llamada con ella.',
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
          body: 'Amiga, alimentar adecuadamente  a nuestros bebés requiere de esfuerzo y de alimentos adecuados. Mira cómo se siente Luz al respecto:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S5-D2-A1.aac',
      description: 'S5D2_A1',
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
          body: 'Luz está pasando por un momento difícil. Como mamás a todas nos pasa. ¿Qué le aconsejarías a Luz? Graba una nota de voz para Luz.',
        },
      },
    ],
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
      body: '¿Crees que Luz debería buscar la manera de conseguir apoyo?\n\nA. ¡Si!.\nB. No estoy segura.',
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
          body: '¡Excelente! ¡Déjame platicarte de la importancia de trabajar en equipo, con un grupo de apoyo en el hogar!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡OK! ¡Déjame platicarte de la importancia de trabajar en equipo, con un grupo de apoyo en el hogar!',
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
          body: '¿Quién está en tu equipo?',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S5-D2-A2.aac',
      description: 'S5D2_A2',
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
          body: 'Ahora, en tu hogar: ¿Quiénes ya son parte de tu equipo de trabajo? ¿Con quiénes cuentas para cumplir con las tareas del hogar y ver por que tu bebé tenga cuidados, se nutra y se desarrolle?',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. El papá de mi bebe',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '2. Mi mamá',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  /* 3. */
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '3. Mi papá',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '4. Mis hijas/hijos',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '5. Mis Hermanas/Hermanos',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '6. Mi suegra',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '7. Mi suegro',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '8. Mi Cuñada/Cuñado',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '9. Mi tía/tio',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '10. Mi abuela/abuelo',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '11. Otro',
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
      },
      {
        option: 'No',
        score: 2,
      },
    ],
  },


  {
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '¡Muy bien! Ahora, ¿hay alguien de los que no elegiste que te gustaría que fuera de tu equipo pero que aún no sientes que hace equipo al 100% contigo? Puedes escribirlo acá:',
    },
    response: {
      type: 'interactive',
      body: '¿Entonces de acuerdo con *{{input_default}}*?',
      buttons: [
        {
          title: 'Si',
        },
        {
          title: 'No',
        },
      ],
      answers: [
        {
          option: 'Si',
          score: 2,
          value: {
            type: 'text',
            body: '¡Muy bien!',
          },
        },
      ],
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
          body: '¡Muchas gracias por compartir, amiga!\n\nEscucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S5-D2-A3.aac',
      description: 'S5D2_A3',
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
          body: 'Ahora, envía una nota de voz a Luz o escríbele un consejo de como hablar con alguien en su hogar para que apoyen más con su bebe:\n\nEstas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología.',
        },
      },
    ],
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
      body: '¡Termina el reto del día, {{name}}! ¡Has ganado {{score}} puntos hoy por participar con tus respuestas! Recuerda, entre más puntos, ¡más chances de ganar en las rifas! Sigamos aprendiendo JUNTAS para ser las mejores mamás. ¡Te escribo pronto!',
    },
  },
]
