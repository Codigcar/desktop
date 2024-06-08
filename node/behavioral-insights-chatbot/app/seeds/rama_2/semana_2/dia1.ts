import { ISemanas } from '../../interfaces'

export const SEM2_D1: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's2_d1_vfinal',
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
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Tu misión de esta semana es ayudar a Marita a encontrar la respuesta correcta para cada pregunta. Ella tiene 18 años, se juntó con su pareja hace dos años y ¡tiene a su primer bebé!\nCada pregunta tiene opciones, una es mejor que las otras. En cada una, ¿cuál crees que es la correcta? *¡Ayuda a Marita y gana puntos por cada respuesta!*',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A1.aac',
      description: 'S2D1_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_fill,h_512,w_512/v1701725865/otxcdg35j6qiqqcgqgig.webp',
      description: 'familia',
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
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A2.aac',
      description: 'S2D1_A2',
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
          body: 'Tu misión de esta semana es ayudar a esta mamá a encontrar la respuesta correcta para cada pregunta. Cada pregunta tiene opciones, una es mejor que las otras. En cada una, ¿cuál crees que es la correcta? *¡Ayuda a Marita y gana puntos por cada respuesta!*',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. ¿Cómo puedo alimentar a mi bebé entre 0 y 6 meses de edad?\n\nA. Le puedes dar agüitas desde que nace como infusiones y agua hervida, y después leche materna.\n\nB. Le puedes dar todo lo que sea líquido o comiditas muy moliditas o licuadas si ves que tiene bastante apetito.\n\nC. Lo mejor que puedes hacer es darle tu leche materna que tiene todo lo que tu bebé necesita para estar bien nutrido, y darle pecho desde la primera hora de vida.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A3.aac',
          description: 'S2D1_A3',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A3.aac',
          description: 'S2D1_A3',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A4.aac',
          description: 'S2D1_A4',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '2. ¿Cómo puedo hacer para que mi bebé pueda succionar mejor mi leche?\n\nA. Debes darle otros alimentos líquidos como agüitas y el líquido de la sopita, para que no se quede sin nada en el estómago.\n\nB. Debes buscar una posición adecuada, en la que estés cómoda y acercándole su boquita al pezón para que succione tu leche. Así, podrás lograr que tu bebé tenga una buena succión de tu leche sin absorber mucho aire hacia su estómago.\n\nC. Debes dejarlo que pase más tiempo y cuando tenga más hambre va a poder succionar mejor.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A5.aac',
          description: 'S2D1_A5',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A6.aac',
          description: 'S2D1_A6',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A5.aac',
          description: 'S2D1_A5',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '3. ¿Qué hago si no tengo suficiente leche? ¿Será que simplemente no puedo producir leche?\n\nA. Puedes tomar agua de avena que es un remedio natural y tradicional de nuestras abuelas.\n\nB. Sin tener que ir al médico, puedes ir por tu cuenta a la farmacia y comprar fórmula láctea y apoyarte de ella cuando sientas que no produces mucha leche y así ya no tienes que desgastarte tanto en intentarlo.\n\nC. Tienes que estimular tus pechos con la succión continua del bebé y con masajes; también, comer bien, y beber muchos líquidos.',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A7.aac',
          description: 'S2D1_A7',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A7.aac',
          description: 'S2D1_A7',
        },
      },
      {
        option: 'C',
        score: 3,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D1-A8.aac',
          description: 'S2D1_A8',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Marita ha seguido tus consejos, y ¡le fue bien!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701802082/skmiwxda2bb7codinezv.webp',
      description: 'Sonrisa',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Pero ahora tiene nuevos retos  ',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1702001897/cr0rg8r4zlyn58fuc2cz.webp',
      description: 'triste ',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Escucha el audio que me acaba de enviar:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'http://www.sonidosmp3gratis.com/sounds/mario-bros%20tuberia.mp3', //! [Falta]
      description: 'S2D1_A11',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¡Te envío información interesante! Escoge la información que quisieras ver primero\n\nA. Cómo saber si el bebé tiene hambre.\n\nB. Cómo saber si el bebé está lleno.\n\nC. Cómo saber si la cantidad de leche que toma es suficiente.',
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
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/infografias/JPG/S2D2_I_1.jpg',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/infografias/JPG/S2D2_I_2.jpg',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/infografias/JPG/S2D2_I_3.jpg',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Marita está pasando por problemas – ¡ayudémosla! Cuando te mande preguntas, elige la mejor opción. Ahora, por favor responde:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¿Qué le está pasando al bebé de Marita si se ve así?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2D2_I_1.jpeg',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Opciones:\n\nA. Estoy curioso\n\nB. Tengo hambre\n\nC. Tengo mucha hambre',
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
          body: '¡La opción correcta era ¡‘tengo hambre’!',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'text',
          body: '¡Es correcto!',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡La opción correcta era ¡‘tengo hambre’!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¿Qué significa cuando el bebé de Marita hace esto?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/aprieta+los+labios.jpeg',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Opciones:\n\nA. Quiero seguir comiendo.\n\nB. Estoy lleno.',
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
          body: '¡La opción correcta era ¡‘Estoy lleno’!',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'text',
          body: '¡Es correcto!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¿Qué significa cuando el bebé de Marita hace esto?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/voltea+la+cabeza.jpeg',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Opciones:\n\nA. Quiero seguir comiendo.\n\nB. Estoy lleno.',
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
          body: '¡La opción correcta era ¡‘Estoy lleno’!',
        },
      },
      {
        option: 'B',
        score: 3,
        value: {
          type: 'text',
          body: '¡Es correcto!',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'La pilita del bebé de Marita es amarillo oscuro y huele fuerte. ¿El bebé de Marita está tomando suficiente leche?',
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
        value: {
          type: 'text',
          body: 'No amiga – el bebé de Marita puede estar deshidratado, un bebé bien hidratado tiene pilita amarillo claro y casi sin olor.',
        },
      },
      {
        option: 'No',
        score: 3,
        value: {
          type: 'text',
          body: '¡Correcto! el bebé de Marita puede estar deshidratado, un bebé bien hidratado tiene pilita amarilla claro y casi sin olor.',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Te gustaría aprender más de alguno de los temas con los que le ayudamos a Marita?\n\nA. ¡Sí! Quiero aprender más de consejos y posiciones para dar el pecho. \n\nB. ¡Sí! Quiero aprender más de cómo estimular mis pechos para producir más leche.\n\nC. ¡No! Por ahora no, gracias.',
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
          body: 'Te dejo una infografía con más información del tema:',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Te dejo una infografía con más información del tema:',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: 'Te dejo una infografía con más información del tema:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/infografias/JPG/S2D1_I_1.jpg',
      description: 'S2D1_I_1',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Opciones',
      buttons: [
        {
          title: 'Más información',
        },
        {
          title: 'No gracias',
        },
      ],
    },
    answers: [
      {
        option: 'Más información',
        score: 2,
        value: {
          type: 'text',
          body: 'https://www.google.com',
        },
      },
      {
        option: 'No gracias',
        score: 2,
        value: {
          type: 'text',
          body: 'Esta bien no te preocupes',
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
        columns: ['score'],
      },
      type: 'text',
      body: '¡Concluimos el reto del día! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas y ayudar a una amiga! Recuerda, entre más puntos, ¡más chances de ganar soles en cada una de las dos rifas!',
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
      description: 'guiño_png',
    },
  },
]
