import { ISemanas } from '../../interfaces'

export const SEM12_D5: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's12_d3_t2',
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: 'Por ser especial, esta última semana será un poco diferente, pues repasaremos lo que hemos visto',
        },
      },
      {
        option: 'B',
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
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D1-A1.aac',
      description: 'S12-D1-A1',
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
          body: 'Vamos a comprometernos con *12 acciones por la salud de nuestros bebés* y aprovechar a ganar puntos extra para tener más oportunidades en el sorteo final!',
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
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '',
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
      body: '2. *A partir de los 6 meses, nutrirlo con alimentos variados y coloridos*, de más machacaditos a más enteros conforme crezca. También, debemos dar leche materna a libre demanda hasta los 2 años\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      needDataFrom: {
        model: 'users',
        columns: ['name'],
      },
      type: 'text',
      body: '¡Gracias, *{{name}}*, por comprometerte con las primeros 4 acciones de 12 por la salud de tu bebé!',
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
          body: 'Ahora, por otros 10 puntos, escucha este audio para recordar nuestra actitud al enfrentar los retos de la maternidad',
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
          body: '¡Muchas gracias por escuchar el audio!. Ahora, veremos los siguientes 4 compromisos. ¡Recuerda, son 5 puntos extra por cada uno!',
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
      body: '8. Ponerle todas las vacunas marcadas en su cartilla. ¡Salvan vidas y son muy seguras\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
          body: '¡Gracias por comprometerte con estas 4 acciones más por la salud de tu bebé!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias por comprometerte con estas 4 acciones más por la salud de tu bebé!',
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
          body: 'Finalmente, hablaremos de los últimos 4 compromisos',
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
      body: '1. Para evitar enfermedades estomacales, me lavo las manos y lavo las manos de mi bebé constantemente\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '2. Si mi bebé se enferma y no quiere comer, le doy de comer cosas que le gustan de poquito en poquito y con paciencia para que no deje de nutrirse\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '3. Enfrento los retos de la maternidad en equipo: Busco el apoyo de mi pareja y mi familia para cumplir con todas las responsabilidades\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
      body: '4. Le doy de comer al bebe en un entorno sin distracciones para concentrarnos en entender sus necesidades\n\nA. ¡Sí me comprometo!\nB. No estoy de acuerdo',
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
          body: '¡Gracias por comprometerte con estas 4 acciones por la salud de tu bebé!',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias por comprometerte con estas 4 acciones por la salud de tu bebé!',
        },
      },
    ],
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
