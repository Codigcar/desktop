import { ISemanas } from '../../interfaces'

export const SEM2_D3: ISemanas[] = [
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
          body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana vaya muy bien! 😊',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Amiga! Me imagino como te puedes sentir y está muy bien que lo expreses, recuerda que a veces un mal día nos pasa a todas, confiemos en que esta será una mejor semana ❤️ ',
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
      body: 'Recuerda que, si necesitas que alguien te escuche, siempre está la opción de que hables con una persona experta en psicología, escribe “*APOYO*” para canalizarte a programar una llamada con ella',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Para iniciar nuestro día de reflexión, te mostraré una lista de 3 pensamientos y sólo tienes que contestar si el pensamiento se te ha cruzado por la mente en la última semana:',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '“Siento un vacio y mucha tristeza cuando estoy sola o con mi bebe”',
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
      body: '“Con frecuencia cambio de emociones, de la tristeza paso a la cólera/irritabilidad”',
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
      body: '“La otra vez pensé en hacerme daño o dañar a mi bebe y me sentí culpable solo pensarlo”',
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
    show_question_if: {
      counter_question: {
        module: 2,
        from_questions: [
          '“Siento un vacio y mucha tristeza cuando estoy sola o con mi bebe”',
          '“Con frecuencia cambio de emociones, de la tristeza paso a la cólera/irritabilidad”',
          '“La otra vez pensé en hacerme daño o dañar a mi bebe y me sentí culpable solo pensarlo”',
        ],
        your_answer_is: ['Si', 'A'],
        if_less_than: 2,
      },
    },
    category: 'info',
    is_waiting_answer: false,
    value: {
      less_than: {
        type: 'text',
        body: '¡Gracias por tus respuesta! Recuerda que, si lo requieres, puedes contar con el apoyo de personal experto en psicología. Solo tienes que enviar la palabra “*APOYO*” y te vamos a redirigir para que puedas contactar a una persona especialista',
      },
      major_than: {
        type: 'text',
        body: 'Siento mucho que hayas tenido estos pensamientos. Para asegurarnos de que te estamos apoyando de la mejor manera, me gustaría que primero converses un poco con una persona experta en psicología que puede orientarte si así lo quisieras. Recuerda que consultar personal especializado en salud emocional es como consultar a cualquier otro médico cuando nos sentimos mal del cuerpo',
      },
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos en cada una',
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
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/Introduccion.png',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'La semana pasada, juntas comenzamos a aprender más cosas para sentirnos mejor como mamás y cuidar no solo nuestra salud sino también la de nuestros bebés!',
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
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Hoy, vamos a hablar sobre los primeros meses de vida de nuestros bebés, y cómo nos sentimos.',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Empezamos?',
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
          body: 'Amiga, es muy importante que nosotras las mamás estemos saludables tanto físicamente como emocionalmente durante el primer año de vida de nuestros bebés.',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Cuando el bebé llega, hay muchos cambios y puede ser estresante, por eso nosotras las mamás podemos cuidarnos mucho para estar bien.',
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
          body: 'Por favor, amiga, mira la imagen y escucha este audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P1.png',
      description: 'S2D3_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A1.aac',
      description: 'S2D3_A1',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Alguna vez te has sentido así?',
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
          body: '¡Siento mucho que te hayas sentido así! Recuerda que es normal, todas nos sentimos así a veces. Estoy segura que lograste salir de situaciones difíciles en otras oportunidades, ¡y que esta vez también lo lograrás!',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu respuesta, amiga! ¡Me alegro!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos',
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
          body: 'Amiga, mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P2.png',
      description: 'S2D3_A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A2.aac',
      description: 'S2D3_A2',
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
          body: 'Amiga, mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P3.png',
      description: 'S2D3_A3',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A3.aac',
      description: 'S2D3_A3',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Alguna vez te has sentido como ella? ¿Con estrés, cansancio, baja de ánimo, desesperación?',
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
          body: 'Siento que te hayas sentido así. Recuerda que es normal, todas nos sentimos así a veces. Estoy segura que lograste salir de situaciones difíciles en otras oportunidades, ¡y que esta vez también lo lograrás!',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu respuesta, amiga! ¡Me alegro!',
        },
      },
    ],
  },

  
  {
    show_question_if: {
      module: 2,
      from_question:
        '¿Alguna vez te has sentido como ella? ¿Con estrés, cansancio, baja de ánimo, desesperación?',
      your_answer_is: ['Si'],
    },
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
      description: 'guiño.sticker',
    },
  },
  {
    show_question_if: {
      module: 2,
      from_question:
        '¿Alguna vez te has sentido como ella? ¿Con estrés, cansancio, baja de ánimo, desesperación?',
      your_answer_is: ['No'],
    },
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701802082/skmiwxda2bb7codinezv.webp',
      description: 'Sonrisa.sticker',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A4.aac',
      description: 'S2D3_A4',
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
          body: 'Amiga, mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P4.png',
      description: 'S2D3_A5',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A5.aac',
      description: 'S2D3_A5',
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
          body: 'Amiga, mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P5.png',
      description: 'S2D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A6.aac',
      description: 'S2D3_A6',
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
          body: 'Amiga, mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P6.png',
      description: 'S2D3_A7',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A7.aac',
      description: 'S2D3_A7',
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
          body: 'Amiga, mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A8.aac',
      description: 'S2D3_A8',
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
          body: 'Amiga, ¿puedes grabar un audio expresando cuáles son los pensamientos saludables que podemos tener en lugar de los pensamientos negativos?',
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '*¡Recuerda! Por cada nota que envías, ganarás 10 puntos que son más oportunidades de ganar en las rifas que haremos.*',
    },
  },
  {
    category: 'question_voice',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: 'Para grabar una nota de voz en WhatsApp, sigue estos pasos:\n1. Mantén presionado el ícono del micrófono 🎙️ para grabar.\n2. Levanta el dedo para enviar automáticamente.\n3. Si quieres corregir, desliza el dedo a la izquierda para cancelar.',
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
          body: 'Amiga, te voy a enseñar a hacer algunos ejercicios que te ayudarán a mantener tu cuerpo y mente sana, pues te pueden ayudar a cambiar tus pensamientos y emociones. Me gustaría que trates de hacer estos ejercicios cada semana para que se conviertan en un hábito, es decir, parte de tu rutina diaria.',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Antes de comenzar, busca un espacio cómodo y tranquilo en tu casa para poder hacer ejercicio. Por ejemplo, puedes recostarte en tu cama o encima de una mantita en el suelo, donde sea más conveniente.',
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
          body: 'Amiga, por favor comienza a escuchar mis siguientes audios y mirar las imágenes que te envío:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P7.png',
      description: 'S2D3_A9',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A9.aac',
      description: 'S2D3_A9',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Muy bien, amiga! Pasemos al segundo ejercicio, por favor mira la imagen y escucha mi audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P8.png',
      description: 'S2D3_A10',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A10.aac',
      description: 'S2D3_A10',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Excelente amiga! Ya casi terminamos. Pasemos al tercer y último ejercicio, por favor mira la imagen y escucha mi audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+2/S2_D3_P9.png',
      description: 'S2D3_A11',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A11.aac',
      description: 'S2D3_A11',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Muy bien, amiga! Espero que estos ejercicios te hayan ayudado a sentirte relajada y más activa.',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Sientes que los ejercicios te han ayudado a sentirte mejor?',
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
          body: '¡Muchas gracias por tu respuesta, amiga! ¡Me alegro!',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu respuesta, amiga! ¡Es normal! Hay que tener paciencia.',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos',
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
          body: 'Amiga',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Te gustaría ponerte una meta del número de veces que harás estos ejercicios durante la semana? ¡Darnos tiempo de hacerlos nos hará sentir mejor! Escoge una de las opciones:',
      sections: [
        {
          title: '1 vez en la semana',
        },
        {
          title: '2 veces en la semana',
        },
        {
          title: '3 veces en la semana',
        },
        {
          title: 'No, gracias',
        },
      ],
    },
    answers: [
      {
        option: '1 vez en la semana',
        score: 5,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '2 veces en la semana',
        score: 5,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '3 veces en la semana',
        score: 5,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: 'No, gracias',
        score: 2,
        value: {
          type: 'text',
          body: 'Entiendo, amiga. ¡Espero puedas incluir otras actividades para relajarte en tu semana!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos',
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
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S2-D3-A12.aac',
          description: 'S2D3_A12',
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
          body: 'Ahora te enviaré tu receta de la semana.',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Cuál receta que puede comer la familia y el bebé quieres ver?\n\nA. Adecuada para bebés de 6 a 8 meses.\nB. Adecuada para bebés de 9 a 11 meses.',
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
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S2D3_R_1.jpg',
          description: 'INSERT RECETA S2D3_R_1 [Puré de hígado con brócoli]',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S2D3_R_2.jpg',
          description: 'INSERT RECETA S2D3_R_2 [Ají de pescado]',
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
          body: '¡Muy Bien!',
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
        columns: ['name', 'score', 'children_1_name'],
      },
      type: 'text',
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente: *{{score}}* PUNTOS totales\n¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé {{children_1_name}} y a ti misma con las otras mamás de JUNTOS en tu región.',
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
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_fill,h_512,w_512/v1701725865/otxcdg35j6qiqqcgqgig.webp',
      description: 'familia',
    },
  },
]
