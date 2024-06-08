import { ISemanas } from '../interfaces'

// s1_d1: 1,1
// sem1_d1: 2,
// sem1_d2: 1

export const SEM1_D0: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's1_d1',
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: 'Mi nombre es JUNTINA y así como tú, tengo un bebé menor de 1 año, y también soy enfermera en la posta de salud',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Mi nombre es JUNTINA y así como tú, tengo un bebé menor de 1 año, y también soy enfermera en la posta de salud',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'sticker',
      body: 'https://res.cloudinary.com/dggqauzyy/image/upload/v1701724766/ct1sawpctqezl8dtutp9.webp',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Cuando estés en un lugar cómodo y sin mucho ruido, por favor, escucha mi audio:',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D1-A1.aac',
      description: 'S1D1_A1',
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
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D1-CONS.aac',
          description: 'S1D1_CONS',
        },
      },
    ],
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Amiga en este enlace puedes encontrar más información sobre lo que te conté en mi audio',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Amiga, escucha el último audio que te envié por favor.\n\n¿Lograste reproducir mi audio?',
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
          body: '¡Gracias amiga!',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Luego de escuchar mi audio, ¿Aceptas ser parte del reto?',
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
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D1-CONS_SI.aac',
          description: 'S1D1_CONS_SI',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          is_last_message_of_day: true,
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D1-CONS_NO.aac',
          description: 'S1D1_CONS_NO',
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
          body: 'Ahora, para saber más de ti, voy a hacerte algunas preguntas! 👀',
        },
      },
    ],
  },
  {
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '¿Cuál es tu primer nombre, sin apellidos? Te llamaré así  en adelante 🙂 \nPor ejemplo: si te llamas María García, escribe sólo María, o Mary si te gustaría que te llame así',
    },
    response: {
      savedDataIn: {
        model: 'users',
        column: 'name',
      },
      type: 'interactive',
      body: '¿Estas de acuerdo que te llamaremos *{{name}}*?',
      buttons: [
        {
          title: 'Si',
        },
        {
          title: 'No',
        },
      ],
      answers: [
        {
          option: 'Si',
          score: 2,
        },
      ],
    },
  },

  {
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '¿Cuál es el primer nombre de tu bebé, sin apellidos? Para llamarlo así en adelante.\nPor ejemplo, si se llama Juan Hernández, escribe solo Juan, o Juanito, si te gusta más que le digamos así',
    },
    response: {
      savedDataIn: {
        model: 'users',
        column: 'children_1_name',
      },
      type: 'interactive',
      body: '¡Genial! ¿Entonces a tu bebe le llamaremos *{{children_1_name}}*?',
      buttons: [
        {
          title: 'Si',
        },
        {
          title: 'No',
        },
      ],
      answers: [
        {
          option: 'Si',
          score: 2,
        },
      ],
    },
  },
  {
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['children_1_name'],
      },
      type: 'text',
      body: '¿Qué día, mes y año nació tu bebé *{{children_1_name}}*. Escríbelo en este formato DD/MM/AAAA. \nPor ejemplo, si nació el 11 de diciembre de 2023, escribe 11/12/2023',
    },
    response: {
      savedDataIn: {
        model: 'users',
        column: 'children_1_birthdate',
      },
      type: 'interactive',
      body: 'De acuerdo, entonces tu bebé nació el *{{children_1_birthdate}}*',
      buttons: [
        {
          title: 'Si',
        },
        {
          title: 'No',
        },
      ],
      answers: [
        {
          option: 'Si',
          score: 2,
        },
      ],
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['children_1_name'],
      },
      type: 'interactive',
      body: '¿Tienes más hijos o hijas? Pueden ser mayores o menores a *{{children_1_name}}*',
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
      module: 1,
      from_question:
        '¿Tienes más hijos o hijas? Pueden ser mayores o menores a *{{children_1_name}}*',
      your_answer_is: ['Si'],
    },
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '¿Cuántos hijos/hijas tienes en total?',
    },
    response: {
      type: 'interactive',
      body: '¿Entonces tienes *{{input_default}} hijos*?',
      buttons: [
        {
          title: 'Si',
        },
        {
          title: 'No',
        },
      ],
      answers: [
        {
          option: 'Si',
          score: 2,
        },
      ],
    },
  },
  {
    show_question_if: {
      module: 1,
      from_question:
        '¿Tienes más hijos o hijas? Pueden ser mayores o menores a *{{children_1_name}}*',
      your_answer_is: ['Si'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Este es tu primer bebe?',
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
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701802082/skmiwxda2bb7codinezv.webp',
          description: 'Insertar sticker Sonrisa',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701802082/skmiwxda2bb7codinezv.webp',
          description: 'Insertar sticker Sonrisa',
        },
      },
    ],
  },
  //* Listas Si/No
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¿Estas otras personas adultas viven en tu hogar?',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: 'Pareja / esposo',
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
      body: 'Madre',
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
      body: 'Padre',
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
      body: 'Suegro',
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
      body: 'Suegra',
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
      body: 'Hermanos/as',
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
      body: 'Otros hijos (mayores de 10 años)',
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
      body: 'Otros',
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
      type: 'interactive-list',
      body: '¿Qué tan seguido utilizas WhatsApp en una semana típica?\n\nA. Todos los días\nB. Pocas veces por semana\nC. Una vez por semana\nD. Rara vez o nunca',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
        },
      ],
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias! Un par de preguntas más:',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias! Un par de preguntas más:',
        },
      },
      {
        option: 'C',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias! Un par de preguntas más:',
        },
      },
      {
        option: 'D',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias! Un par de preguntas más:',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Trabajas fuera del hogar?',
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
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
          description: 'guiño',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
          description: 'guiño',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Gracias por tus respuestas, amiga! Para terminar, te haremos preguntas sobre cómo te sientes. Cuéntanos con sinceridad y confianza 🤗',
    },
  },
  //* Solo permite 24 caracteres en las listas
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Durante las *últimas 2 semanas*, ¿qué tan seguido has tenido molestias debido a los siguientes problemas?',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '1. Poco interés o placer en hacer cosas\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '2. Sintiéndote decaída, deprimida, o sin esperanzas\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '3. Dificultad en caer o permanecer dormida, o dormir demasiado\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '4. Sintiéndote cansada o teniendo poca energía\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '5. Pobre de apetito o comer en exceso\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '6. Sintiéndote mal contigo misma, que eres es un fracaso o que has quedado mal contigo misma o con su familia\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '7. Dificultad en concentrarte en cosas, tales como leer el periódico o ver televisión\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '8. ¿Moviéndote o hablando tan lento, que otras personas podrían notarlo? O lo contrario, has estado tan inquieta o agitada que has estado moviéndote mucho más de lo normal\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '9. Pensamientos de que tú estarías mejor muerta  o de alguna manera lastimándote a tí misma\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '10. Sentirme nerviosa, ansiosa o a punto de estallar\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '11. No poder parar de preocuparme\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días\nD. Casi todos los días',
      sections: [
        {
          title: 'A',
        },
        {
          title: 'B',
        },
        {
          title: 'C',
        },
        {
          title: 'D',
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
      {
        option: 'C',
        score: 2,
      },
      {
        option: 'D',
        score: 2,
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Gracias amiga! Estamos para apoyarte. 👏',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S1-D1-A-ESP.aac',
      description: 'S1D1_A_esp',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Hasta pronto amiga! Te escribiré el próximo XX[FECHA SE DEFINIRA PROXIMO AL LANZAMIENTO]XXX.  Recuerda: ¡Juntas, podemos!',
    },
  },
]
