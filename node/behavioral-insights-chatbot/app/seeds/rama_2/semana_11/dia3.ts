import { ISemanas } from '../../interfaces'

/* Día 3_S5 :Salud de la madre (infancia temprana) */
export const SEM11_D3: ISemanas[] = [
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
        value:{
          type: 'text',
          body: 'Finalmente, pasamos a la receta de comida de hoy,  Hoy hablaremos de las frutas y verduras. ¡Siempre las mencionamos pero ahora les daremos su espacio! Recuerda que deben ser de distintos colores y variadas y que sin miedo alguno puedes incluirlas en las comidas del bebé desde los 6 meses'
        }
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Te dejo una tabla para que veas la explicación que te acabo de contar',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/infografias/JPG/S11D3_I_1.jpg',
      description: 'INSERTAR INFOGRAFÍA S11D3_I_1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Te dejo una tabla para que veas la explicación que te acabo de contar',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S11D3_R_1.jpg',
      description:
        'RECETA DE LA SEMANA 11- S11D3_R_1 (Tallarines verdes con hígado)',
    },
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
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente: *{{score}} PUNTOS* totales ¡Felicitaciones, amiga! 💪 \n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé {{children_1_name}} y a ti misma con las otras mamás de JUNTOS en tu región',
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
      description: 'familia',
    },
  },
]
