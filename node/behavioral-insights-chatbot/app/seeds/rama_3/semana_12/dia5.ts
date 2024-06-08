import { ISemanas } from '../../interfaces'

export const SEM12_D5: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 'rama3_s12_d5',
    },
    answers: [
      {
        option: 'Si',
        score: 2,
        value: {
          type: 'text',
          body: 'Por ser especial, esta última semana será un poco diferente, pues repasaremos lo que hemos visto',
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
          body: 'Escucha mi audio:',
        },
      },
    ],
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
          body: 'Vamos a comprometernos con 12 acciones por nuestra propia salud que beneficien a nuestros bebés y aprovechar a ganar puntos extra para tener más oportunidades en el sorteo final!',
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
          body: 'Por cada compromiso que aceptes, ¡te llevarás 5 puntos extra! Hoy, veremos los primeros 8 compromisos',
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
      body: '1. Es importante cuidar bien a los bebés, sabiendo que cómo se siente la mamá afecta tanto su salud como la del bebé, y que pensar de forma positiva nos lleva a actuar de manera positiva\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '2. *Es importante reconocer y abordar los pensamientos negativos y emociones como la tristeza y preocupación en la maternidad.* Esto permite evitar que impacten negativamente en la salud tanto de la madre como del bebé\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '3. *El estrés y la abrumación pueden tener un impacto significativo en la salud emocional de la madre y en la relación con el bebé*. Es importante reconocer estos síntomas y estados de ánimo para solicitar ayuda de familiares, amigas o profesionales competentes\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '4. Es crucial buscar apoyo de familiares, amigos o adultos de confianza para evitar sentirse sola y las consecuencias negativas que esto puede tener tanto para la madre como para el bebé\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
          body: 'Ahora, por otros 10 puntos, escucha este audio para recordar nuestra actitud al enfrentar los retos de la maternidad:',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D1-A2.aac',
      description: 'S12D1_A2',
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
          body: 'Ahora, escucha este audio sobre las personas que están en nuestro equipo para cuidar a nuestros bebés',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D2-A1.aac',
      description: 'S12D2_A1',
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
          body: 'Finalmente, hablaremos de los últimos 4 compromisos.',
        },
      },
    ],
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
          body: 'Presiona la opción “Sí me comprometo” si estás dispuesta a realizar estas acciones:',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '1. Reconoces la importancia de cambiar pensamientos negativos por saludables y buscar apoyo de personas cercanas, incluyendo al padre del bebé, para el bienestar físico y emocional de ambos\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '2. Consideras importante cuidar nuestra salud como madres sin culpa ni juicio, reconociendo que esto beneficia tanto a nosotras como a nuestros bebés\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '3. Estoy de acuerdo en reservar tiempo cada día para actividades saludables de cuidado propio o de relajación, con el respaldo de familiares y amigos, para cuidar nuestra salud sin descuidar a nuestros bebés\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '4. Creo un vínculo con mi bebé al pasar tiempo juntos en un lugar tranquilo, sin cosas que nos distraigan, para entender lo que necesita\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '¡Gracias por comprometerte con estas 4 acciones por la salud de tu bebé!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora, escucha este audio sobre compartir el reto del cuidado con los papás de nuestros bebés',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D3-A1.aac',
      description: 'S12D3_A1',
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
          body: 'Ahora amiga, responde estas breves preguntas sobre hablar conmigo',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Cómo calificarías tu experiencia el chatbot durante los últimos tres meses?',
      sections: [
        {
          title: '0=Muy mala',
        },
        {
          title: '1=Mala',
        },
        {
          title: '2=Aceptable',
        },
        {
          title: '3=Bueno',
        },
        {
          title: '4=Muy bueno',
        },
      ],
    },
    answers: [
      {
        option: '0=Muy mala',
        score: 2,
      },
      {
        option: '1=Mala',
        score: 2,
      },
      {
        option: '2=Aceptable',
        score: 2,
      },
      {
        option: '3=Bueno',
        score: 2,
      },
      {
        option: '4=Muy bueno',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Si tuviéramos que escalar este chatbot, ¿qué probabilidades hay de que lo recomiendes a tus amigas o familiares para que ellos también puedan obtener esta información?',
      sections: [
        {
          title: '0=Muy mala',
        },
        {
          title: '1=Mala',
        },
        {
          title: '2=Aceptable',
        },
        {
          title: '3=Bueno',
        },
        {
          title: '4=Muy bueno',
        },
      ],
    },
    answers: [
      {
        option: '0=Muy mala',
        score: 2,
      },
      {
        option: '1=Mala',
        score: 2,
      },
      {
        option: '2=Aceptable',
        score: 2,
      },
      {
        option: '3=Bueno',
        score: 2,
      },
      {
        option: '4=Muy bueno',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Cómo calificarías la cantidad de mensajes que te enviamos?',
      sections: [
        {
          title: '0=Muy mala',
        },
        {
          title: '1=Mala',
        },
        {
          title: '2=Aceptable',
        },
        {
          title: '3=Bueno',
        },
        {
          title: '4=Muy bueno',
        },
      ],
    },
    answers: [
      {
        option: '0=Muy mala',
        score: 2,
      },
      {
        option: '1=Mala',
        score: 2,
      },
      {
        option: '2=Aceptable',
        score: 2,
      },
      {
        option: '3=Bueno',
        score: 2,
      },
      {
        option: '4=Muy bueno',
        score: 2,
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Finalmente, me gustaría recordar las doce acciones que repasamos esta semana para que siempre las recuerdes. Puedes reenviar esto a otras personas a las que creas que les será útil 🙂',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D3-A2.aac',
      description: 'S12D3_A2',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Amiga! Hoy concluimos después de 12 semanas de reflexionar juntas. Ha sido genial aprender contigo.  Escucha mi último audio',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D3-A3-B.aac',
      description: 'S12D3_A3-B',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'El programa JUNTOS siempre está aquí para apoyarte. ¡Hasta pronto!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Te envio este material del ministerio de salud:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'pdf',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/pdf/PDF_MINSA.pdf',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Para seguir aprendiendo de la nutrición de tu bebé, recuerda que puedes contactar al personal de Juntos en tu localidad',
    },
  },
]
