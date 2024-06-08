import { ISemanas } from '../../interfaces'

/* Dia 3_S3: Relación de la mamá con su bebé */
export const SEM3_D3: ISemanas[] = [
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
  //         body: '¡Siento mucho que estés así! ¡Espero que tu semana mejore y que conversar conmigo hoy te suba el ánimo!',
  //       },
  //     },
  //   ],
  // },

  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's2_d3',
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
          body: 'gracias por tu respuesta, siguiente pensamiento:',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'gracias por tu respuesta, siguiente pensamiento:',
        },
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
        value: {
          type: 'text',
          body: 'gracias por tu respuesta, siguiente pensamiento:',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: 'gracias por tu respuesta, siguiente pensamiento:',
        },
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
        value: {
          type: 'text',
          body: 'De acuerdo',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: 'De acuerdo',
        },
      },
    ],
  },
  {
    show_question_if: {
      counter_question: {
        module: 3,
        from_questions: [
          's2_d3',
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
        body: '¡Gracias por tus respuesta! Recuerda que, si lo requieres, puedes contar con el apoyo de personal experto en psicología. Solo tienes que enviar la palabra “APOYO” y te vamos a redirigir para que puedas contactar a una persona especialista',
      },
      major_than: {
        type: 'text',
        body: 'Siento mucho que hayas tenido estos pensamientos. Para asegurarnos de que te estamos apoyando de la mejor manera, me gustaría que primero converses un poco con una persona experta en psicología que puede orientarte si así lo quisieras. Recuerda que consultar personal especializado en salud emocional es como consultar a cualquier otro médico cuando nos sentimos mal del cuerpo',
      },
    },
  },
  {
    show_question_if: {
      counter_question: {
        module: 3,
        from_questions: [
          's2_d3',
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
        body: 'Recuerda que consultar personal especializado en salud emocional es como consultar a cualquier otro médico cuando nos sentimos mal del cuerpo',
      },
      major_than: {
        type: 'contact',
        body: '',
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
          type: 'text',
          body: '¡Muy bien!',
        },
      },
    ],
  },
  {
    show_question_if: {
      module: 2,
      from_question:
        '¿Te gustaría ponerte una meta del número de veces que harás estos ejercicios durante la semana? ¡Darnos tiempo de hacerlos nos hará sentir mejor! Escoge una de las opciones:',
      your_answer_is: [
        '1 vez en la semana',
        '2 veces en la semana',
        '3 veces en la semana',
      ],
    },
    category: 'info',
    is_waiting_answer: true,
    value: {
      needDataFrom: {
        model: 'user_messages',
        from_question:
          '¿Te gustaría ponerte una meta del número de veces que harás estos ejercicios durante la semana? ¡Darnos tiempo de hacerlos nos hará sentir mejor! Escoge una de las opciones:',
        module: 2,
        columns: ['message'],
      },
      type: 'interactive',
      body: 'El viernes pasado me pediste que te recuerde que te habías puesto la meta de hacer los ejercicios que te enseñé *{{message}}*, ¿lograste cumplirla?\n\nA. Si\nB. No\nC. Más o menos (inicié, pero no hice todo)',
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
        score: 5,
        value: {
          type: 'text',
          body: '¡Felicitaciones, amiga! ¡Lograste tener tiempo para ti y has ganado 5 puntos adicionales! 🙌',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'No te preocupes, amiga. Hay semanas más difíciles que otras, espero puedas tener algo de tiempo para ti esta semana ❤️',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Está bien, amiga! Lo importante es que empezaste, sigue esforzándote 💪',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por favor, amiga, mira la imagen y escucha el siguiente audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P1.png',
      description: 'S3D3_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A1.aac',
      description: 'S3D3_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Amiga, puedes grabar un audio contándome qué opinas sobre cómo se está sintiendo la mamá de la imagen cuando mira a su bebe.',
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
      type: 'text',
      body: '¡Listo, amiga!',
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
          body: 'Por favor, amiga, mira la imagen y escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P2.png',
      description: 'S3D3_A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A2.aac',
      description: 'S3D3_A2',
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
          body: 'Por favor, amiga, mira la imagen y escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P3.png',
      description: 'S3D3_A3',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A3.aac',
      description: 'S3D3_A3',
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
          body: 'Por favor, amiga, mira la imagen y escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P4.png',
      description: 'S3D3_A4',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A4.aac',
      description: 'S3D3_A4',
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
          body: 'Por favor, amiga, mira la imagen y escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P5.png',
      description: 'S3D3_A5',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A5.aac',
      description: 'S3D3_A5',
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
          body: 'Por favor, amiga, mira la imagen y escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P6.png',
      description: 'S3D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A6.aac',
      description: 'S3D3_A6',
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
          body: 'Por favor, amiga, escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A7.aac',
      description: 'S3D3_A7',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Amiga, con base en los ejemplos que te he dado, ¿te ayudaría expresar en una nota de voz qué otros pensamientos saludables se te ocurren para reemplazar aquellos pensamientos negativos que alguna vez has tenido hacia tu bebé y que te han hecho sentir mal?',
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
          body: 'Amiga, te voy a enseñar algunas actividades que te ayudarán a fortalecer tu relación con tu bebé, te harán sentir mejor emocionalmente, y también mejorarán tus pensamientos. Recuerda que buscamos hacer estos ejercicios cada semana para que se conviertan en un hábito constante. Antes de comenzar, busca un espacio cómodo y tranquilo en tu casa para poder hacer los ejercicios con tu bebé. Por ejemplo, puedes recostarte en tu cama o en el suelo, donde sea más conveniente.',
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
          body: 'Amiga, por favor comienza a mirar las imágenes y escuchar los audios a continuación:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P7.png',
      description: 'S3D3_A8',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A8.aac',
      description: 'S3D3_A8',
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
          body: '¡Excelente amiga! Pasemos a la segunda y última actividad de esta semana, por favor mira la imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+3/S3_D3_P8.png',
      description: 'S3D3_A9',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A9.aac',
      description: 'S3D3_A9',
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
      body: '¿Te gustaría ponerte la meta de hacer alguna de las dinámicas que te mostré con tu bebé durante la semana? ¡Compartir este tiempo de calidad con nuestros bebés es fundamental para construir un lazo positivo con ellos/as! Cuéntame cuántas veces te propones realizarlo',
      sections: [
        {
          title: '2 veces por semana',
        },
        {
          title: '4 veces por semana',
        },
        {
          title: '1 vez por día',
        },
        {
          title: 'No, gracias',
        },
      ],
    },
    answers: [
      {
        option: '2 veces por semana',
        score: 5,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '4 veces por semana',
        score: 5,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '1 vez por día',
        score: 5,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: 'No, gracias',
        score: 5,
        value: {
          type: 'text',
          body: 'Entiendo, amiga. ¡Espero puedas incluir otras actividades con tu bebé en la semana!',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos.',
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
          body: 'Ahora, te compartiré información sobre los alimentos cítricos te enviaré tu receta de la semana que utiliza tomate:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S3-D3-A10.aac',
      description: 'S3D3_A10',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora te enviaré tu receta de la semana que utiliza tomate, que es un alimento cítrico:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S3D3_R_1.jpg',
      description: 'S3D3_R_1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['name', 'children_1_name', 'score'],
      },
      type: 'text',
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente: *{{score}} PUNTOS* totales.\n¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé *{{children_1_name}}* y a ti misma con las otras mamás de JUNTOS en tu región',
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
