import { ISemanas } from '../../interfaces'

export const SEM12_D3: ISemanas[] = [
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
      body: 'Recuerda que, si necesitas que alguien te escuche, siempre está la opción de que hables con una persona experta en psicología, escribe “APOYO” para canalizarte a programar una llamada con ella',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Esta semana concluimos este reto en el que hemos caminado Juntas con otras mamás también! ¡Felicidades por llegar hasta acá! Por ser especial, esta última semana será un poco diferente, pues repasaremos lo que hemos visto',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Escucha mi audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D2-A3.aac',
      description: 'S12D1_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Vamos a comprometernos con *12 acciones por la salud de nuestros bebés* y aprovechar a ganar puntos extra para tener más oportunidades en el sorteo final!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por cada compromiso que aceptes, ¡te llevarás 5 puntos! Hoy, veremos los primeros 8 compromisos',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. *De 0 a 6 meses, lo único que debemos darle a las y los bebés es leche materna*. No hay que darles agüitas, agua simple ni sólidos. Solo si el/la doctora te lo receta, podemos usar fórmula láctea\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '2. *A partir de los 6 meses*, nutrirlo con alimentos variados y coloridos, de más machacaditos a más enteros conforme crezca. También, debemos dar leche materna a libre demanda hasta los 2 años\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '3. *De 6 meses en adelante, incrementar la cantidad de comida conforme crezca*. Recuerda, como las manecillas del reloj: 6 meses, medio plato; 9 meses, ¾ de plato; y 12 meses, un plato entero\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '4. *Priorizar darle alimentos ricos en hierro*. Siempre incluye en sus comidas algo de huevo, hígado, sangrecita, pescado, carne o pollo. También, frijoles, lentejas, arvejas, garbanzos y chícharos\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
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
        columns: ['name'],
      },
      type: 'text',
      body: '¡Gracias, {{name}}, por comprometerte con las primeros 4 acciones de 12 por la salud de tu bebé!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora, por otros 10 puntos, escucha este audio para recordar nuestra actitud al enfrentar los retos de la maternidad:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D1-A2.aac',
      description: 'S12-D1-A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Muchas gracias por escuchar el audio!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora, veremos los siguientes 4 compromisos. ¡Recuerda, son 5 puntos extra por cada uno!',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '5. Darle los suplementos de hierro diario a partir de los 4 meses de edad hasta los 6. Después, continuar con los micronutrientes diario por 12 meses\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '6. Hacerle la prueba de anemia a los 6 meses de edad y, si es positiva, darle el tratamiento diario hasta que se cure\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '7. Llevarlo a todas las citas CRED necesarias. Cada semana durante el primer mes de vida, y una vez al mes hasta que cumpla 12 meses\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '8. Ponerle todas las vacunas marcadas en su cartilla. ¡Salvan vidas y son muy seguras!\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
        score: 5,
      },
      {
        option: 'B',
        score: 2,
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Gracias por comprometerte con estas 4 acciones más por la salud de tu bebé!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora, escucha este audio sobre las personas que están en nuestro equipo para cuidar a nuestros bebés',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D2-A1.aac',
      description: 'S12-D2-A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['name'],
      },
      type: 'text',
      body: '¡Termina el reto del día, {{name}} Sigamos aprendiendo JUNTAS para ser las mejores mamás. ¡Te escribo pronto!',
    },
  },
]
