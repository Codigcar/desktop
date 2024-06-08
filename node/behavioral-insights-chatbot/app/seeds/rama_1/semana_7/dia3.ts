import { ISemanas } from '../../interfaces'

export const SEM7_D3: ISemanas[] = [
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
        module: 7,
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
        module: 7,
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
          body: 'Te quiero recordar lo que aprendimos la semana pasada:\n\n✅ Aprendimos a que a veces nosotras las mamás podemos sentir que cuidar de nuestros bebés es mucho trabajo y que no puede ser divertido. Es normal que a veces pensemos así pero es necesario que nos demos cuenta que esos pensamientos no son saludables porque nos producirán sentimientos y conductas que no favorecen la salud emocional de nuestro bebé.\n✅ Aprendimos que, en realidad, sí podemos tener diversión con nuestros bebés cuando cuidamos de ellos. Incluso, los ayudamos a que se desarrollen.',
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
      module: 6,
      from_question:
        '¿Te gustaría ponerte el objetivo de hacer al menos 1 de las dinámicas que te mostré con tu bebé durante la semana? ¡Compartir este tiempo de calidad con nuestros bebés es fundamental para construir un lazo positivo con ellos/as! Cuéntame cuántas veces te propones realizarlo:',
      your_answer_is: [
        '2 veces por semana',
        '4 veces por semana',
        '1 vez cada día',
      ],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'El viernes pasado me pediste que te recuerde que te habías puesto la meta de hacer las actividades que te enseñé con tu bebé, ¿lograste cumplirla?\n\nA. Si\nB. No\nC. Más o menos (inicié pero no hice todo)',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+7/S7_D3_P1.png',
      description: 'S7D3_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A1.aac',
      description: 'S7D3_A1',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+7/S7_D3_P2.png',
      description: 'S7D3_A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A2.aac',
      description: 'S7D3_A2',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+7/S7_D3_P3.png',
      description: 'S7D3_A3',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A3.aac',
      description: 'S7D3_A3',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A4.aac',
      description: 'S7D3_A4',
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
      type: 'interactive',
      body: '¿Alguna vez has sentido miedo de contarle a tu familia o doctor sobre problemas de salud que has tenido?',
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
          body: 'Siento mucho escuchar eso. Recuerda que es normal, a veces nos cuesta contarle a los demás lo que estamos sintiendo en nuestro cuerpo',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+7/S7_D3_P4.png',
      description: 'S7D3_A5',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A5.aac',
      description: 'S7D3_A5',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+7/S7_D3_P5.png',
      description: 'S7D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A6.aac',
      description: 'S7D3_A6',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+7/S7_D3_P6.png',
      description: 'S7D3_A7',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A7.aac',
      description: 'S7D3_A7',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A8.aac',
      description: 'S7D3_A8',
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
          body: 'Amiga, mantén presente que no podré responder a tu audio pero que estas grabaciones son una herramienta para ti, para ayudarte a reflexionar y sentirte mejor. ¡También te ayudan a ganar 10 puntos adicionales!',
        },
      },
    ],
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
          body: '¡Muchas gracias por trabajar en tu reflexión, amiga! ¡Has ganado 10 puntos!',
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
          body: 'Por favor, amiga, escucha mi consejo:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D3-A9.aac',
      description: 'S7D3_A9',
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
      body: 'Amiga ¿Te gustaría ponerte una meta del número de veces que harás estos ejercicios durante la semana? ¡Darnos tiempo de hacerlos nos hará sentir mejor! Escoge una de las opciones:',
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
          body: 'Entiendo, amiga. ¡Espero puedas conversar con tus familiares en la semana en caso lo necesites!',
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
          body: '¡Veamos una receta hoy con super ingredientes! Por 10 puntos, elige una opción:',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Elige una opción:\n\nA. ¿Quieres ver una receta que usa hígado y arvejas?\nB. ¿Quieres tener una receta que haya sido compartida por otras mamás como tú?',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S7D3_R_1.jpg',
          description:
            'RECETA DE LA SEMANA 8 - S7D3_R_1  (Purecito de hígado y arveja)',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'image',
          body: 'https://pbs.twimg.com/ext_tw_video_thumb/767366841979265024/pu/img/hj-AEua_Icg8R9Je.jpg:large',
          description: 'pendiente enviar...',
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
    category: 'question_voice_or_image',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: 'Si tienes una receta rica en proteína y nutritiva para tus bebes, compártela acá como una foto o audio:',
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['name', 'score', 'children_1_name'],
      },
      type: 'text',
      body: '¡Has concluido esta semana, *{{name}}*! Tienes actualmente: *{{score}} PUNTOS* totales.\n¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé {{children_1_name}} y a ti misma con las otras mamás de JUNTOS en tu región.',
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
