import { ISemanas } from '../../interfaces'

export const SEM1_D1: ISemanas[] = [
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D1-A2.aac',
      description: 'S1D1_A2.1V1',
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
          body: 'Recuerda: Siempre escucha mis mensajes en un ambiente tranquilo, para que no te pierdas nada de lo que te cuento. Siempre que te haga una pregunta, ¡escoge una sola opción, la que creas mejor o correcta!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Éstas son las bases para ganar por participar:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '✅ Sólo por estar participando ya, te damos 50 puntos para comenzar. \n✅ Por cada audio que escuches y cada pregunta que respondas, te damos 2 puntos y, si atinas a la correcta, te damos 3 puntos.\n✅ Si respondes a las actividades adicionales podrás ganar puntos más rápido.\n✅ Cuantos más puntos tengas, ¡más oportunidades tendrás de ganar en los dos sorteos que haremos! También, aprenderás más para que tu bebé crezca sano y fuerte! \n✅ El primer premio es en la semana 7 y el premio final es en la semana 12, al concluir.\n✅ Cada 100 puntos son un boleto de rifa, entre más puntos ganes, más oportunidades tendrás de ganar. Si sales en el sorteo podrás ganar premios de entre 20 y 50 soles!\n✅ Te avisaremos los resultados del sorteo y si has sido ganadora, te pediremos tu número de billetera electrónica (Yape/Plin/Bim/Tunki/Agora) para transferirte.\n✅ *IMPORTANTE* Revisa que tengas habilitadas las palomitas azules de tu WhatsApp, así podré verificar si has escuchado las notas de voz que te enviaré para ganar los puntos adicionales que te darán ventaja',
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['children_1_name', 'children_1_birthdate'],
      },
      type: 'text',
      body: 'Por cierto, dado que *{{children_1_name}}* que nació el *{{children_1_birthdate}}*, te voy a enviar recordatorios de las fechas en que debes llevarlo a la posta para sus controles regulares y sus vacunas, muy importantes para su salud 🙂 ',
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Amiga, *te envio este material del ministerio de salud:*',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'pdf',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/pdf/PDF_MINSA.pdf'
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['score'],
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
      description: 'ginio',
    },
  },
]
