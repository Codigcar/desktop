import { ISemanas } from '../../interfaces'

export const SEM1_D3: ISemanas[] = [
  
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's1_d3',
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A1.aac',
          description: 'S1D3_A1',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A1.aac',
          description: 'S1D3_A1',
        },
      },
    ],
  },
  //    {
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
          type: 'image',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P1.png',
          description: 'S1D3_A2',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A2.aac',
      description: 'S1D3_A2',
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
          body: 'Puede sernos útil reflexionar de vez en cuando sobre cómo estamos emocionalmente. Las siguientes preguntas sirven precisamente para eso y para que yo sepa cómo estás, amiga. Es muy fácil responder. Solo necesitas pensar en cómo te sientes y en qué cosas estás pensando. Si te sientes feliz, puede marcar esta carita 😀, si te sientes triste, puede marcar esta otra carita 😔, y si no sabes muy bien cómo te sientes, marca esta carita 😐',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Sería bueno que anotes en un cuaderno📝 o recuerdes los pensamientos que te han hecho sentir mal. Así podrás entender mejor tus emociones y encontrar formas de sentirte mejor. ¡Es una manera divertida de cuidar nuestras emociones como mamás!',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['name'],
      },
      type: 'interactive',
      body: '¿Cómo te sientes *{{name}}*?\n\nA. 😀\nB. 😐\nC. 😔',
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
      body: 'Ahora amiga, quisiera que escuches este mensaje sobre la atención a la salud emocional:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A2-B.aac',
      description: 'S1D3_A2-B',
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
          body: 'Para seguir en este camino de reflexión, te mostraré una lista de pensamientos y sólo tienes que contestar si este pensamiento se te ha cruzado por la mente en el último mes o no.',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. "Siento un vacio y mucha tristeza cuando estoy sola o con mi bebe"',
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
      body: '2. "A veces duermo mucho y descuido a mi bebe y otras veces no tengo sueño pero tampoco puedo cuidar a mi bebe"',
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
      body: '3. "Por mi estado de ánimo, no soy una madre responsable, descuido mucho a mi bebe"',
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
      body: '4. "Con frecuencia cambio de emociones, de la tristeza pasó a la cólera/irritabilidad"',
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
      body: '5. "La otra vez pensé en hacerme daño o dañar a mi bebe y me sentí culpable solo pensarlo"',
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
      body: '6. "Aunque amo a mi bebe, a veces he pensado que me arrepiento de haber sido madre"',
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
      body: '7. "La otra vez pensé que mi bebe estaria mejor sin mi y tambien pense que yo estaría mejor sin él"',
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
      body: '8. "Últimamente no siento conexión emocional hacia mi bebe"',
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
      body: '9. "Siempre he sido nerviosa y por eso no puedo evitar esta sensación de no saber qué hacer con mi bebe y me siento culpable"',
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
      body: '10. "Desde que nació mi bebe me he aislado y no tengo ganas de ver gente"',
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
        module: 1,
        from_questions: [
          '1. "Siento un vacio y mucha tristeza cuando estoy sola o con mi bebe"',
          '2. "A veces duermo mucho y descuido a mi bebe y otras veces no tengo sueño pero tampoco puedo cuidar a mi bebe"',
          '3. "Por mi estado de ánimo, no soy una madre responsable, descuido mucho a mi bebe"',
          '4. "Con frecuencia cambio de emociones, de la tristeza pasó a la cólera/irritabilidad"',
          '5. "La otra vez pensé en hacerme daño o dañar a mi bebe y me sentí culpable solo pensarlo"',
          '6. "Aunque amo a mi bebe, a veces he pensado que me arrepiento de haber sido madre"',
          '7. "La otra vez pensé que mi bebe estaria mejor sin mi y tambien pense que yo estaría mejor sin él"',
          '8. "Últimamente no siento conexión emocional hacia mi bebe"',
          '9. "Siempre he sido nerviosa y por eso no puedo evitar esta sensación de no saber qué hacer con mi bebe y me siento culpable"',
          '10 "Desde que nació mi bebe me he aislado y no tengo ganas de ver gente"',
        ],
        your_answer_is: ['Si'],
        if_less_than: 5,
      },
    },
    category: 'info',
    is_waiting_answer: false,
    value: {
      less_than: {
        type: 'text',
        body: '¡Gracias por tus respuesta! Recuerda que, si lo requieres, puedes contar con el apoyo de personal experto en psicología. Solo tienes que enviar la palabra “APOYO” y te vamos a redirigir para que puedas contactar a una persona especialista.\nRecuerda que consultar personal especializado en salud emocional es como consultar a cualquier otro médico cuando nos sentimos mal del cuerpo',
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
        module: 1,
        from_questions: [
          '1. "Siento un vacio y mucha tristeza cuando estoy sola o con mi bebe"',
          '2. "A veces duermo mucho y descuido a mi bebe y otras veces no tengo sueño pero tampoco puedo cuidar a mi bebe"',
          '3. "Por mi estado de ánimo, no soy una madre responsable, descuido mucho a mi bebe"',
          '4. "Con frecuencia cambio de emociones, de la tristeza pasó a la cólera/irritabilidad"',
          '5. "La otra vez pensé en hacerme daño o dañar a mi bebe y me sentí culpable solo pensarlo"',
          '6. "Aunque amo a mi bebe, a veces he pensado que me arrepiento de haber sido madre"',
          '7. "La otra vez pensé que mi bebe estaria mejor sin mi y tambien pense que yo estaría mejor sin él"',
          '8. "Últimamente no siento conexión emocional hacia mi bebe"',
          '9. "Siempre he sido nerviosa y por eso no puedo evitar esta sensación de no saber qué hacer con mi bebe y me siento culpable"',
          '10 "Desde que nació mi bebe me he aislado y no tengo ganas de ver gente"',
        ],
        your_answer_is: ['Si'],
        if_less_than: 5,
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
      body: 'Ahora, ¡Empecemos! por favor, amiga, mira la imagen y escucha el siguiente audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P1.png',
      description: 'S1_D3_P1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A3.aac',
      description: 'S1D3_A3',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P2.png',
      description: 'S1D3_A3-B',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A3-B.aac',
      description: 'S1D3_A3-B',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P3.png',
      description: 'S1D3_A4',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A4.aac',
      description: 'S1D3_A4',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P4.png',
      description: 'S1D3_A5',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A5.aac',
      description: 'S1D3_A5',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Amiga, ¿estás de acuerdo con la importancia de las 3 áreas que te he descrito para tu salud y la de tu bebé?',
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
          body: '¡Muchas gracias por tu respuesta, amiga!',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: '¡Sigamos conversando, espero convencerte, amiga!',
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
  /* [Cambiando la agenda de la familia de problemas hacia soluciones] */
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Amiga! Ahora vamos a hablar sobre otra cosa. Por favor, mira la imagen y escucha mi audio:',
    },
  },
  /*  */
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P5.png',
      description: 'S1D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A6.aac',
      description: 'S1D3_A6',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Amiga, ¿te sueles sentir estresada por los problemas de la vida?',
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
          body: 'Siento mucho que te hayas sentido así. Recuerda que es normal, todas nos sentimos así a veces. Estoy segura que lograste salir de situaciones difíciles en otras oportunidades, ¡y que esta vez también lo lograrás!',
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
      body: 'Por participar y responder a mis preguntas, has ganado 2 puntos.',
    },
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P6.png',
      description: 'S1D3_A7',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A7.aac',
      description: 'S1D3_A7',
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
      body: 'Amiga, a veces, nosotras las mamás podemos sentirnos muy estresadas por cosas que pasan en el diario, ¡es normal!. En el fondo, eso viene de formas de pensar no muy saludables de pensar que nos hacen sentir mal. Llamaremos a estas formas de pensar: “malos pensamientos”',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Los pensamientos negativos afectan cómo nosotras mismas nos sentimos, cómo actuamos con nuestros bebés y con nuestra familia, amigos y comunidad',
    },
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P7.png',
      description: 'S1D3_A8',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A8.aac',
      description: 'S1D3_A8',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P8.png',
      description: 'S1D3_A9',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A9.aac',
      description: 'S1D3_A9',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P9.png',
      description: 'S1D3_A10',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A10.aac',
      description: 'S1D3_A10',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P10.png',
      description: 'S1D3_A11',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A11.aac',
      description: 'S1D3_A11',
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
          body: 'Quisiera dejarte una herramienta que me gustaría que uses cada vez que sientas emociones tristes. Es una fórmula eficaz que te puede ayudar a sentir mejor siempre y cuando la practiques seguido. De hecho, la practicaremos a lo largo de estas 12 semanas que estaremos en contacto',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '*Toda emoción y conducta provienen de un pensamiento.* Si logras cambiar tus pensamientos, puedes cambiar tus emociones y entonces puedes cambiar tus acciones y las consecuencias de ellas. ¡Está en tus manos y es como un superpoder!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Escucha mi siguiente mensaje y mira la imagen que le acompaña:!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+11/S11_D3_P8.png',
      description: 'S1D3_A11-B',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3-A11-B.aac',
      description: 'S1D3_A11-B',
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
          body: 'Amiga, te voy a pedir que me escuches una última vez por hoy. Vamos a hablar sobre nuestras familias y comunidad',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por favor, amiga, mira la imagen y escucha este audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P11.png',
      description: 'S1D3_A12',
    },
  },
   {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D3_A12.aac',
      description: 'S1D3_A12',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Amiga, puedes grabar un audio contándome los nombres de quienes son tu red de soporte?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología',
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
      type: 'text',
      body: '¡Listo amiga! ¡Con eso terminamos la semana! ⭐\nAquí está tu receta de la semana, estará enfocada en la sangrecita:',
    },
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
      description: 'S1D3_A13',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Esto es lo que haremos todas las semanas: reflexionaremos juntas para sentirnos mejor. ¡Tan solo hablaremos alrededor de 10 minutos cada viernes y ganarás puntos!\n\nPor participar y responder a mis preguntas, has ganado 2 puntos en cada una.',
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
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente: *{{score}} PUNTOS* totales\n¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé *{{children_1_name}}* y a ti misma con las otras mamás de JUNTOS en tu región.\n\n¡JUNTAS podemos! ¡Nos vemos la próxima semana!',
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
