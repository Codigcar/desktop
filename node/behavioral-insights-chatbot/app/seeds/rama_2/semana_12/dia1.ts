import { ISemanas } from '../../interfaces'
/* Semana 11: Apego / Juntina y Juntino
 */
export const SEM12_D1: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's12_d1_t2_v2',
    },
    answers: [
      {
        option: 'Sí, por favor',
        score: 2,
        value: {
          type: 'text',
          body: 'Recuerda que, entre más participes y más actividades concluyas, más puntos podrás acumular para participar en la rifa que haremos al finalizar la encuesta de esta semana',
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
          body: 'Todas las participantes que respondan la encuesta concursarán, pero quienes tengan más puntos por participar tendrán muchas más oportunidades de ganar ✨🏆',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '*¿Lista para ganar puntos y aprender JUNTAS?*\n\nA. ¡Listísima! 😎\nB. Algo lista ¡pero adelante! 😆',
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
          body: 'Esta encuesta te tomará entre 15 o 20 minutos ⏰',
        },
      },
      {
        option: 'B',
        score: 2,
        value: {
          type: 'text',
          body: 'Esta encuesta te tomará entre 15 o 20 minutos ⏰',
        },
      },
    ],
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Por favor responde en un momento en que estés tranquila. Si pausas, puedes reiniciar!',
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
      body: '*{{name}}* ¿Lista para empezar?',
      buttons: [
        {
          title: '👍',
        },
        {
          title: '😀',
        },
      ],
    },
    answers: [
      {
        option: '👍',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias!',
        },
      },
      {
        option: '😀',
        score: 2,
        value: {
          type: 'text',
          body: '¡Gracias!',
        },
      },
    ],
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
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
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['A', 'B'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
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
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['A', 'B'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'En la última semana, ¿cuántas veces/días le diste a tu bebé agüitas, agua o cualquier otra cosa diferente a la leche materna?\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['B', 'C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Desde que tu bebé cumplió 4 meses, ¿con qué frecuencia le das suplementos de hierro (gotitas) en una semana?\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question_input',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: '¿Cuántas veces has llevado a tu bebé a las citas CRED desde que nació? Responde con un número',
    },
    response: {
      type: 'interactive',
      body: '¿Entonces de acuerdo con *{{input_default}}*?',
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
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'En la última semana, ¿cuántas veces alimentaste a tu bebé con leche materna?\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'En la última semana, ¿cuántas veces alimentaste a tu bebé con alimentos como los siguientes: pollo, hígado de pollo, res, hígado de res, sangrecita, bazo, pescado o huevos?\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },
  {
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'En la última semana, ¿cuántas veces alimentaste a tu bebé con alimentos como los siguientes: lentejas, frijoles, arvejas, habas (enteras o en harina)?\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'En la última semana, ¿cuántas veces alimentaste a tu bebé con frutas y verduras de diferentes colores, por ejemplo: zapallo, naranja, zanahoria, tomates, papaya, espinacas, acelga…\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Le han hecho a tu bebé pruebas de anemia?\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    show_question_if: {
      module: 12,
      from_question:
        'Primero amiga, recuerdame, ¿Qué edad tiene tu bebé ahora?\n\nA. 0-4 meses\nB. 4-6 meses\nC. 6-9 meses\nD. 9-12 meses',
      your_answer_is: ['C', 'D'],
    },
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Si tu bebé dio positivo en la prueba de anemia:\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
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
      type: 'interactive',
      body: '*{{name}}* felicitaciones! ¡Has completado el tercer de 4 bloques de preguntas! Ya casi terminas! 🎉',
      buttons: [
        {
          title: '👍',
        },
        {
          title: '😀',
        },
      ],
    },
    answers: [
      {
        option: '👍',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
        },
      },
      {
        option: '😀',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
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
        columns: ['score'],
      },
      type: 'text',
      body: 'Ya vas ganando *{{score}} PUNTOS*. ¡Te falta poco para terminar la encuesta y participar en el sorteo por muchos premios de 20-50 soles!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Ahora, amiga, elige la respuesta que más se acerque a cómo te sientes en general',
    },
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Tengo confianza en alimentar a mi bebé\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Entiendo lo que mi bebé intenta decirme\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Si mi bebé tiene un resfriado común o fiebre leve, puedo manejarlo con confianza\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Estoy segura de que mi pareja estará ahí para ayudarme cuando necesito apoyo\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Estoy segura de que las personas cercanas a mi estarán ahí para ayudarme cuando necesite apoyo\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Ser madre es muy estresante para mí\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Siento que estoy haciendo un buen trabajo como madre\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Cuando cuido a mi bebé, me tomo un tiempo para pensar en los pasos específicos que debo seguir y las estrategias a utilizar para mejorar su salud y su bienestar\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Conforme mi bebé va creciendo, anoto cuándo se enferma, qué medicamentos y comidas le doy, y cuántas veces lo llevo al médico\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Cuando siento que no estoy haciendo todo lo posible para mantener a mi bebé sano y feliz, en vez de seguir así, yo pienso en otras formas mejores de hacer las cosas\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Reflexiono sobre por qué mi forma de hacer las cosas como madre sí funciona bien, no funciona bien, o podría mejorarse\n\n0=Casi nunca (0 veces a la semana)\n1=No muy seguido (1-2 veces a la semana)\n2=A veces (3-4 veces a la semana)\n3=La mayor parte del tiempo (5-7 veces a la semana)\n4=Saltear',
      sections: [
        {
          title: '0',
        },
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
      ],
    },
    answers: [
      {
        option: '0',
        score: 2,
      },
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
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
      type: 'interactive',
      body: '*{{name}}* felicitaciones! ¡Has completado el tercer de 4 bloques de preguntas! Ya casi terminas! 🎉',
      buttons: [
        {
          title: '👍',
        },
        {
          title: '😀',
        },
      ],
    },
    answers: [
      {
        option: '👍',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
        },
      },
      {
        option: '😀',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
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
        columns: ['score'],
      },
      type: 'text',
      body: 'Ya vas ganando *{{score}} PUNTOS*. ¡Te falta poco para terminar la encuesta y participar en el sorteo por muchos premios de 20-50 soles!',
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
          body: 'Ahora, te haremos preguntas sobre cómo te sientes. Cuéntanos con sinceridad y confianza 🤗',
        },
      },
    ],
  },
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
      body: 'Poco interés o placer en hacer cosas\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Sintiéndote decaída, deprimida, o sin esperanzas\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Problemas de sueño como: dificultad en quedarte dormida, despertarte en medio de la noche, o dormir demasiado\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Sintiéndote cansada o teniendo poca energía\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Poco de apetito o comer en exceso\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Sintiéndote mal contigo misma, que eres es un fracaso o que has quedado mal contigo misma o con su familia\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Dificultad en concentrarte en cosas, tales como leer el periódico o ver televisión\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: '¿Moviéndote o hablando tan lento, que otras personas podrían notarlo? O lo contrario, has estado tan inquieta o agitada que has estado moviéndote mucho más de lo normal\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Tener pensamientos de que tú estarías mejor muerta  o lastimándote a tí misma de alguna manera\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'Sentirte nerviosa, ansiosa o a punto de estallar\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      body: 'No poder parar de preocuparte\n\nA. Ningún día\nB. Varios días\nC. Más de la mitad de los días \nD. Casi todos los días',
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
      needDataFrom: {
        model: 'users',
        columns: ['name'],
      },
      type: 'interactive',
      body: '*{{name}}* felicitaciones! ¡Has completado el primero de 4 bloques de preguntas!',
      buttons: [
        {
          title: '👍',
        },
        {
          title: '😀',
        },
      ],
    },
    answers: [
      {
        option: '👍',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
        },
      },
      {
        option: '😀',
        score: 2,
        value: {
          type: 'sticker',
          body: 'https://res.cloudinary.com/dggqauzyy/image/upload/c_scale,h_512,w_512/v1701844634/ngftcszoduvj709bmhno.webp',
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
        columns: ['score'],
      },
      type: 'text',
      body: 'Ya vas ganando *{{score}} PUNTOS*. ¡Te falta poco para terminar la encuesta y participar en el sorteo por muchos premios de 20-50 soles!',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Las siguientes preguntas te piden que pienses en todas las madres de tu comunidad que tienen bebés de hasta un añito y que estimes o adivines lo que hacen',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'No hay respuesta correcta o incorrecta. ¡Solo adivina lo mejor que puedas! 😄',
    },
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Del total de mamás en tu comunidad, ¿Cuántas mamás crees que alimentan a sus bebés menores de 6 meses solo con leche materna, sin agregar agüitas, agua u otros alimentos?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Del total de mamás en tu comunidad, ¿Cuántas mamás crees que le dan a sus bebés suplementos de hierro todos los días a partir de los 4 meses de edad?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Del total de mamás en tu comunidad, ¿Cuántas mamás crees que se cuidan a sí mismas comiendo bien y durmiendo bien además de cuidar al bebé?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: 'Del total de mamás en tu comunidad, ¿Cuántas mamás crees que comparten responsabilidades de cuidado con su pareja?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Piensa en todas las madres de tu comunidad que tienen bebés entre 0 y 12 meses para responder las siguientes preguntas. Ponte en sus zapatos',
    },
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Qué tan de acuerdo o en desacuerdo estarian las mamás de tu comunidad en alimentar a sus bebitos menores de 6 meses sólo con leche materna sin agregar agüitas, agua u otros alimentos?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Qué tan de acuerdo o en desacuerdo estarian las mamás de tu comunidad en darle a sus bebés suplementos de hierro todos los días a partir de los 4 meses de edad?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Qué tan de acuerdo o en desacuerdo estarian las mamás de tu comunidad sobre que ellas deben cuidarse a sí mismas comiendo adecuadamente y durmiendo bien además de cuidar al bebé?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive-list',
      body: '¿Qué tan de acuerdo o en desacuerdo estarian las mamás de tu comunidad en compartir las responsabilidades de cuidado con su pareja?\n\n1=Pocas o ninguna mamá\n2=Algunas mamás\n3=Masomenos la mitad de las mamás\n4=La mayoría de las mamás\n5=Casi todas las mamás\n6=Saltear',
      sections: [
        {
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
      ],
    },
    answers: [
      {
        option: '1',
        score: 2,
      },
      {
        option: '2',
        score: 2,
      },
      {
        option: '3',
        score: 2,
      },
      {
        option: '4',
        score: 2,
      },
      {
        option: '5',
        score: 2,
      },
      {
        option: '6',
        score: 2,
      },
    ],
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Muchas gracias por tu respuestas amiga! Con esto terminamos 🎉🎉🎉',
    },
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      needDataFrom: {
        model: 'users',
        columns: ['score'],
      },
      type: 'text',
      body: '¡En total, has ganado *{{score}} PUNTOS*!',
    },
  },

  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¡Estás lista para la rifa final por 20-50 soles! En los próximos dias te escribiremos para avisarte si fuiste seleccionada o no en la rifa!',
    },
  },
]
