import { ISemanas } from '../../interfaces'

/* Dia 3_S4: Relación de la madre con las personas que la rodean. */
export const SEM4_D3: ISemanas[] = [
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
      body: 'Recuerda que, si necesitas que alguien te escuche, siempre está la opción de que hables con una persona experta en psicología, escribe “*APOYO*” para canalizarte a programar una llamada con ella.',
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
          body: 'Para iniciar nuestro día de reflexión, te mostraré una lista de 3 pensamientos y sólo tienes que contestar si el pensamiento se te ha cruzado por la mente en la última semana:',
        },
      },
    ],
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
    show_question_if: {
      counter_question: {
        module: 4,
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
        body: '¡Gracias por tus respuesta! Recuerda que, si lo requieres, puedes contar con el apoyo de personal experto en psicología. Solo tienes que enviar la palabra “*APOYO*” y te vamos a redirigir para que puedas contactar a una persona especialista',
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
        module: 4,
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
          body: '¡Comencemos! Te quiero recordar lo que aprendimos la semana pasada:\n\n✅ Aprendimos a reconocer que, a veces, podemos tener pensamientos no saludables hacia nuestros bebés y que estos pueden provocar sentimientos tristes y afectar no solo nuestra salud y la de nuestros bebés, sino también cómo ambos nos relacionamos.\n✅ Aprendimos a reemplazar esta clase de pensamientos negativos por unos más saludables. Entendimos que tener estados de ánimo negativos no nos convierten en malas madres, sino que hay que aprender a reconocerlos pero también apoyarnos en nuestra red de soporte como familia y comunidad. Recuerda: ¡Pienso saludable, actúo saludable!',
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
      body: 'Amiga ¿Has sentido alguna emoción negativa en particular sobre tu relación con tu bebé en la última semana?',
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
          body: '¡Siento mucho que te hayas sentido así! Es normal que se nos crucen esas emociones a veces. Recuerda que, si necesitas que alguien te escuche, siempre está la opción de que hables con una persona experta en psicología, escribe “APOYO” para canalizarte a programar una llamada con ella.',
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
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Sientes que las actividades que te enseñé el viernes para hacer con tu bebé fortalecieron su relación y te ayudaron a sentirte mejor?',
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
          body: '¡Muchas gracias por tu respuesta, amiga! ¡Es normal! Hay que tener paciencia',
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
    show_question_if: {
      module: 3,
      from_question:
        '¿Te gustaría ponerte la meta de hacer alguna de las dinámicas que te mostré con tu bebé durante la semana? ¡Compartir este tiempo de calidad con nuestros bebés es fundamental para construir un lazo positivo con ellos/as! Cuéntame cuántas veces te propones realizarlo',
      your_answer_is: [
        '2 veces por semana',
        '4 veces por semana',
        '1 vez por día',
      ],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      needDataFrom: {
        model: 'user_messages',
        from_question:
          '¿Te gustaría ponerte la meta de hacer alguna de las dinámicas que te mostré con tu bebé durante la semana? ¡Compartir este tiempo de calidad con nuestros bebés es fundamental para construir un lazo positivo con ellos/as! Cuéntame cuántas veces te propones realizarlo',
        module: 3,
        columns: ['message'],
      },
      type: 'interactive',
      body: 'El viernes pasado me pediste que te recuerde que te habías puesto la meta de hacer las actividades que te enseñé con tu bebé *{{message}}*, ¿lograste cumplirla?\n\nA. Si\nB. No\nC. Más o menos (inicié pero no hice todo)',
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
          body: '¡Felicitaciones, amiga! ¡Lograste continuar la construcción de un lazo saludable con tu bebé y has ganado 5 puntos adicionales! 🙌',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'No te preocupes, amiga. Hay semanas más difíciles que otras, espero puedas tener tiempo de hacer las dinámicas con tu bebé esta semana ❤️',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Está bien, amiga! Lo importante es que empezaste 💪',
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
          body: 'Amiga, es muy importante que nosotras las mamás nos llevemos bien con las personas que nos rodean, especialmente porque necesitamos su ayuda y compañía. También, es bueno para nuestros bebés cuando nosotras las mamás tenemos buenos amigos y familiares cerca',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P1.png',
      description: 'S4D3_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A1.aac',
      description: 'S4D3_A1',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P2.png',
      description: 'S4D3_A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A2.aac',
      description: 'S4D3_A2',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P3.png',
      description: 'S4D3_A3',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A3.aac',
      description: 'S4D3_A3',
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
          body: 'Amiga, puedes grabar un audio expresando, ¿alguna vez has tenido esta clase de sentimientos hacia personas cercanas a ti como familia y amigos?',
        },
      },
    ],
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
          body: '*¡Recuerda! Por cada nota que envías, ganarás 10 puntos que son más oportunidades de ganar en las rifas que haremos*',
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
    category: 'question_voice',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '*Para grabar una nota de voz en WhatsApp, sigue estos pasos:*\n1. Mantén presionado el ícono del micrófono 🎙️ para grabar.\n2. Levanta el dedo para enviar automáticamente.\n3. Si quieres corregir, desliza el dedo a la izquierda para cancelar.',
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
      body: 'Por favor, amiga, escucha el siguiente audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A4.aac',
      description: 'S4D3_A4',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P4.png',
      description: 'S4D3_A5',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A5.aac',
      description: 'S4D3_A5',
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
          body: 'Por favor, amiga, mira las imagenes y escucha el siguiente audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P5.png',
      description: 'S4D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P6.png',
      description: 'S4D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A6.aac',
      description: 'S4D3_A6',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P7.png',
      description: 'S4D3_A7',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A7.aac',
      description: 'S4D3_A7',
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
          body: 'Amiga, con base en los ejemplos que te he dado, te ayudaría expresar en una nota de voz, ¿qué otros pensamientos saludables se te ocurren para reemplazar aquellos sentimientos negativos que alguna vez has tenido hacia tu entorno familiar?\nPor ejemplo, ¿hay personas que te han mostrado respeto y amor? ¿Hay personas en tu familia o en tu comunidad en general que han mostrado interés por ti tu bebé?',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+1/S1_D3_P11.png',
      description: 'S4D3_A8',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A8.aac',
      description: 'S4D3_A8',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora amiga, te dejaré una tarea para esta semana. Tu tarea va a ser pedirle a alguien en tu familia o amigas que juegue con el bebé al menos una vez al día',
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
          body: 'Por favor, amiga, mira la siguiente imagen y escucha mi audio:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+4/S4_D3_P8.png',
      description: 'S4D3_A9',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S4-D3-A9.aac',
      description: 'S4D3_A9',
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
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Amiga ¿Te gustaría ponerte la meta de cumplir con esta tarea durante la semana? ¡Es importante incluir a tus familiares en actividades con tu bebé! Cuéntame cuántas veces te propones realizarlo:',
      sections: [
        {
          title: '3 veces por semana',
        },
        {
          title: '1 vez cada día',
        },
        {
          title: '2 veces cada día',
        },
        {
          title: 'No, gracias',
        },
      ],
    },
    answers: [
      {
        option: '3 veces por semana',
        score: 2,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '1 vez cada día',
        score: 2,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '2 veces cada día',
        score: 2,
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
          body: 'Entiendo, amiga. ¡Espero puedas incluir a tus familiares en otras actividades con tu bebé!',
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
          body: 'Ahora te enviaré tu receta de la semana',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/BIT_Recetas-1.jpg',
      description: 'Mazamorra de Sangrecita BIT Recetas',
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
    category: 'question_voice_or_image',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: 'Si tienes una receta rica y nutritiva para tus bebes, compártela acá como una foto o audio:',
    },
    answers: [
      {
        option: 'voice',
        score: 10,
      },
      {
        option: 'image',
        score: 10,
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
          body: '¡Muy bien!',
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
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente *{{score}} PUNTOS* totales ¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé *{{children_1_name}}* y a ti misma con las otras mamás de JUNTOS en tu región.',
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
