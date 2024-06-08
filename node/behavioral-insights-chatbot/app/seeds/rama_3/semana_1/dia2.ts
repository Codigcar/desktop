import { ISemanas } from '../../interfaces'

export const SEM1_D2: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's1_d1_rama_de_control_1',
      needDataFrom: {
        model: 'users',
        columns: ['name', 'children_1_name'],
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
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D2-A1.aac',
      description: 'S1D1_A2.3',
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
          body: 'Recuerda: Siempre escucha mis mensajes en un ambiente tranquilo, para que no te pierdas nada de lo que te cuento. Siempre que te haga una pregunta, ¡escoge una sola opción, la que creas mejor o correcta! ',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Éstas son las bases para ganar por participar: ',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '✅ Sólo por estar participando ya, te damos 50 puntos para comenzar. \n✅ Por cada audio que escuches y cada pregunta que respondas, te damos 2 puntos y, si atinas a la correcta, te damos 3 puntos.\n✅ Si respondes a las actividades adicionales podrás ganar puntos más rápido. \n✅ Cuantos más puntos tengas, ¡más oportunidades tendrás de ganar en los dos sorteos que haremos! También, aprenderás más para que tu bebé crezca sano y fuerte! \n✅ El primer premio es en la semana 7 y el premio final es en la semana 12, al concluir.\n✅ Cada 100 puntos son un boleto de rifa, entre más puntos ganes, más oportunidades tendrás de ganar. Si sales en el sorteo podrás ganar premios de entre 20 y 50 soles!\n ✅ Te avisaremos los resultados del sorteo y si has sido ganadora, te pediremos tu número de billetera electrónica (Yape/Plin/Bim/Tunki/Agora) para transferirte. \n✅ *IMPORTANTE* Revisa que tengas habilitadas las palomitas azules de tu WhatsApp, así podré verificar si has escuchado las notas de voz que te enviaré para ganar los puntos adicionales que te darán ventaja',
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
          body: 'Hola amiga, *te envío este material del ministerio de salud:*',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'pdf',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/pdf/PDF_MINSA.pdf',
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
          body: '¡Gracias amiga! Empecemos. Te comparto el mensaje de hoy:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D2-A1.aac',
      description: 'S1D2_A1',
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
          body: 'Ahora, quiero contarte lo que me dijo mi abuela hace varios años, cuando tuve a mi primer hijo, Pedrito:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D2-A2.aac',
      description: 'S1D2_A2',
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
          body: '¡Esta historia  de mi abuela me cambió completamente! Aunque soy una profesional de la salud, pongo atención a lo que otras personas hacen, aprendo del conocimiento de otras personas que ya han tenido bebés.  Además, como enfermera, adapto lo que sé para darle a mi bebé el cuidado que necesita',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Qué te parece todo esto? ¿Crees que es importante poner atención para aprender  de las personas  mayores, y del personal de salud y luego ponerlo en práctica  para el cuidado de nuestro bebé? Escoge la opción de respuesta que consideres mejor.\n\nA. Sí, me parece una manera adecuada para darle el mejor cuidado a mi bebé.\nB. No, creo que lo más importante es escuchar a las personas que ya han tenido bebés y los han criado.\nC. No, creo que lo mejor es escuchar al personal de salud en todo sin considerar nada más.',
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
          type: 'text',
          body: '¡Muchas gracias por compartir lo que piensas!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por compartir lo que piensas!',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por compartir lo que piensas!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Quiero contarte un poco de cómo será la dinámica entre nosotras',
      description: 'S1D2_A3',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D2-A3.aac',
      description: 'S1D2_A3',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Quiénes pueden ser las personas en tu familia, tu comunidad o la posta a las que puedes recurrir para aprender?\n\nA. Enfermera del centro de salud.\nB. Mi familia.\nC. Mis vecinas y amigas.\nD. Otros.',
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
          body: '¡Muy bien!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muy bien!',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muy bien!',
        },
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },

  {
    show_question_if: {
      module: 1,
      from_question:
        '¿Quiénes pueden ser las personas en tu familia, tu comunidad o la posta a las que puedes recurrir para aprender?\n\nA. Enfermera del centro de salud.\nB. Mi familia.\nC. Mis vecinas y amigas.\nD. Otros.',
      your_answer_is: ['D'],
    },
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '¿Quiénes?',
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
      body: '¿Qué tanto crees que podrás actuar como una mamá que vive usando las tres A en su día a día? Elige la opción que consideres.\n\nA. Muy probablemente.\nB. Más o menos probable.\nC. Poco probable.',
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
      },
      {
        option: 'B',
        score: 2,
      },
      {
        option: 'C',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Recuerda que la posta es una gran fuente de información. ¿Ya sabes cuándo es tu próxima cita CRED y dónde será? Escoge una opción\n\nA. ¡Si!\nB. ¡No! Pero lo investigaré',
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
          body: 'Escucha mi audio:',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D2-A4.aac',
      description: 'S1D2_A4',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Escoge  las opciones sobre tus fortalezas más grandes como mujer y como mamá: Marca los números de hasta cinco opciones que mejor te representen, separadas por espacios.\nTe doy un ejemplo: 1 6 10',
    },
  },
  {
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '1. Valiente\n2. Fuerte\n3. Amorosa y amable\n4. Abierta a aprender y mejorar\n5. Protectora\n6. Trabajadora\n7. Vuelve a intentar y no se deja vencer\n8. Espíritu de explorar nuevas cosas\n9. Hábil e inteligente\n10. Alegre y positiva',
    },
    response: {
      type: 'interactive',
      body: '¡Felicidades! Estos valores *{{input_default}}* son los valores de las grandes madres que aman a sus hijos',
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
            body: 'Amiga, ¿puedes grabar un audio contándome sobre cómo vives tus valores? Durante el tiempo que estaremos realizando actividades, estas notas de voz te ayudarán a reflexionar por ti misma sobre tus ideas y emociones para sentirte mejor',
          },
        },
      ],
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor',
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
      body: '¡Termina el reto del día, *{{name}}* Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas! Recuerda, entre más puntos, ¡más chances de ganar en las rifas! Sigamos aprendiendo JUNTAS para ser las mejores mamás. ¡Te escribo pronto!',
    },
  },
]
