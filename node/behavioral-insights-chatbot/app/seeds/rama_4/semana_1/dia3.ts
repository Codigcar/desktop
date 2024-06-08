import { ISemanas } from '../../interfaces'

export const SEM1_D3: ISemanas[] = [
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
  //         type: 'audio',
  //         body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A1.aac',
  //         description: 'S1D3_A1',
  //       },
  //     },
  //     {
  //       option: 'B',
  //       score: 2,
  //       value: {
  //         type: 'audio',
  //         body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A1.aac',
  //         description: 'S1D3_A1',
  //       },
  //     },
  //   ],
  // },

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
          body: 'Aquí está tu receta de la semana, estará enfocada en la sangrecita:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3_A13.aac',
      description: 'S1D3_A13',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S1D3_R_1.jpg',
      description: 'S1D3_R_1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Listo amiga! ¡Con eso terminamos la semana! ⭐\nPor participar, has ganado 2 puntos en cada una', //!
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
        columns: ['name', 'score', 'children_1_name'],
      },
      type: 'text',
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente: *{{score}} PUNTOS* totales\n¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé *{{children_1_name}}* y a ti misma con las otras mamás de JUNTOS en tu región',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡JUNTAS podemos! ¡Nos vemos la próxima semana!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/v1702505968/p9i6kgovzu8gqayza7le.webp',
      description: 'Juntin fam_transparente.png',
    },
  },
]
