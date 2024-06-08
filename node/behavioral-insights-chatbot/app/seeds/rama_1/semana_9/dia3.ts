import { ISemanas } from '../../interfaces'

/* Día 3_S9: Relación de la mamá con su bebe (infancia media)  */

export const SEM9_D3: ISemanas[] = [
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
        module: 9,
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
        module: 9,
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
          body: '¡Comencemos! Te quiero recordar lo que aprendimos la semana pasada:\n\n✅ Aprendimos que la creencia y el pensamiento del  ‘mal de ojo’ puede causar que no acudamos al médico y tengamos problemas de salud. Podemos estar muy estresadas por este pensamiento e incluso perder plata y tiempo por buscar a chamanes o curanderos en vez de ir a un médico primero.\n\n✅ Entonces, aprendimos que debemos confiar en la medicina moderna cuando nosotras las mamás o nuestros bebés nos sintamos mal. Podemos usar esta medicina con las otras costumbres que aprendimos en nuestra familia como complemento, siempre y cuando informemos al médico para asegurarnos de que no interactúa negativamente.',
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
      module: 8,
      from_question:
        '¿Te gustaría ponerte la meta de hacer una lista de al menos 2 ideas/pensamientos negativos que quisieras reemplazar por pensamientos más saludables? ¡Verás cómo esto impacta en la fuerza de tus emociones y, en consecuencia, en ti y tu bebé! Cuéntame cuántas veces te propones realizarlo:',
      your_answer_is: [
        '3 veces por semana',
        '1 vez cada día',
        '2 veces cada día',
      ],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      needDataFrom: {
        model: 'user_messages',
        from_question:
          '¿Te gustaría ponerte la meta de hacer una lista de al menos 2 ideas/pensamientos negativos que quisieras reemplazar por pensamientos más saludables? ¡Verás cómo esto impacta en la fuerza de tus emociones y, en consecuencia, en ti y tu bebé! Cuéntame cuántas veces te propones realizarlo:',
        module: 8,
        columns: ['message'],
      },
      type: 'interactive',
      body: 'El viernes pasado me pediste que te recuerde que te habías puesto la meta de hacer una lista de cómo reemplazarías al menos 2 pensamientos negativos por otros más saludables. Me contaste que lo harías {{message}}, ¿lograste cumplirla?\n\nA. Si\nB. No\nC. Más o menos  (inicié, pero no lo culminé)',
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
          body: '¡Felicitaciones, amiga! ¡Lograste mejorar tus pensamientos y, por lo tanto, reducir las emociones negativas que puedes sentir sobre ciertas situaciones! 🙌',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'No te preocupes, amiga. Hay semanas más difíciles que otras, espero puedas tener tiempo de hacer la lista durante esta semana ❤️',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P1.png',
      description: 'S9D3_A1',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A1.aac',
      description: 'S9D3_A1',
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
      body: '¿A veces sientes que si tu bebé está enfermo es porque eres una mala madre?',
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
          body: 'Siento que hayas tenido esos pensamientos. Recuerda que es normal, pero verás que con mi compañía poco a poco esos pensamientos irán cambiando',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu respuesta, amiga!',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P2.png',
      description: 'S9D3_A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A2.aac',
      description: 'S9D3_A2',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P3.png',
      description: 'S9D3_A3',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A3.aac',
      description: 'S9D3_A3',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A4.aac',
      description: 'S9D3_A4',
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
      body: '¿Alguna vez has tenido esta clase de emociones acerca de tu bebé? Por ejemplo, temor a relacionarte con él por miedo a engreirlo mucho',
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
          body: 'Siento que te hayas sentido así. Recuerda que es normal, pero sigamos intentando cambiar esos pensamientos poco a poco en favor de nuestros bebés',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu respuesta, amiga!',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P4.png',
      description: 'S9D3_A5',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A5.aac',
      description: 'S9D3_A5',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P5.png',
      description: 'S9D3_A6',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A6.aac',
      description: 'S9D3_A6',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P6.png',
      description: 'S9D3_A7',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A7.aac',
      description: 'S9D3_A7',
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
          body: 'Amiga, puedes grabar un audio contándome, ¿cómo podrías reemplazar pensamientos negativos que tienes sobre ser una mala mamá por unos más saludables?',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Cómo cómo mi amiga del barrio reemplazó su pensamiento negativo -que su bebé se estaba enfermando porque ella era una mala madre- por un pensamiento saludable -que el bebé se estaba enfermando porque su sistema inmunológico se está desarrollando lentamente y no lo suficientemente fuerte todavía para protegerse de todas las enfermedades.',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Estas notas de voz son confidenciales y te ayudarán a reflexionar por ti misma sobre tus emociones y sentirte mejor. *Puedes usarlas como referencia si tienes una llamada con una persona experta en psicología*',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A8.aac',
      description: 'S9D3_A8',
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
          body: 'Amiga, con los ejercicios de esta semana, te voy a enseñar la importancia del juego para fortalecer la relación con tu bebé y mejorar tus pensamientos sobre su vínculo. Recuerda que cada semana buscamos seguir practicando los ejercicios o actividades que hemos venido realizando para que se vuelvan en un hábito constante',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/images/Semana+9/S9_D3_P7.png',
      description: 'S9D3_A9',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A9.aac',
      description: 'S9D3_A9',
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
      body: '¿Te gustaría ponerte la meta de hacer algunos de los ejemplos de juegos que te mostré con tu bebé durante la semana? ¡Compartir este tiempo de calidad con nuestros bebés es fundamental para construir un lazo positivo con ellos/as y seguir estimulando su desarrollo! Cuéntame cuántas veces te propones realizarlo:',
      sections: [
        {
          title: '4 veces por semana',
        },
        {
          title: '2 veces por semana',
        },
        {
          title: '1 vez cada día',
        },
        {
          title: 'No, gracias',
        },
      ],
    },
    answers: [
      {
        option: '4 veces por semana',
        score: 2,
        value: {
          type: 'text',
          body: '¡Excelente! Te preguntaré la siguiente semana si has cumplido con tu meta. Si lo logras, ¡ganarás 5 puntos adicionales! 🎉',
        },
      },
      {
        option: '2 veces por semana',
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
        option: 'No, gracias',
        score: 2,
        value: {
          type: 'text',
          body: 'Entiendo, amiga. ¡Espero puedas incluir otras actividades con tu bebé en la semana!',
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
          body: 'Por último, te traigo información sobre la importancia de incluir carnes, pescado y huevos en la alimentación de tu bebé',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S9-D3-A10.aac',
      description: 'S3D1_A10',
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
          body: 'Te dejo una tabla para que veas la explicación que te acabo de contar',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/infografias/JPG/S9D3_I_1.jpg',
      description: 'INSERTAR INFOGRAFÍA S9D3_I_1',
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
          body: 'Te paso dos recetas que usan carne o huevo, buenas para bebés de 9 a 12 meses: una de especito de hígado, y otra de rayitos de sol.',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S9D3_R_1.jpg',
      description: 'RECETA S9D3_R_1 [Espesito de hígado]',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'image',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/recetas/JPG/S9D3_R_2.jpg',
      description: 'RECETA S9D3_R_2 [Rayitos de sol]',
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
      body: '¡Has concluido esta semana, {{name}}! Tienes actualmente: {{score}} PUNTOS totales\n¡Felicitaciones, amiga! 💪\n\n¡Recuerda que, si logras más puntos, más oportunidades de llevarte un premio, y aprendes más a cuidar a tu bebé {{children_1_name}} y a ti misma con las otras mamás de JUNTOS en tu región',
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
      description: 'familia.sticker',
    },
  },
]
