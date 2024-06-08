import { ISemanas } from '../../interfaces'

export const SEM12_D5: ISemanas[] = [
  {
    category: 'template',
    is_waiting_answer: true,
    value: {
      body: 's12_d3',
    },
    answers: [
      {
        option: 'A',
        score: 2,
        value: {
          type: 'text',
          body: 'Presiona la opción “Sí me comprometo” si estás dispuesta a realizar estas acciones:',
        },
      },
      {
        option: 'B',
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
        score: 5,
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
        score: 5,
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
        score: 5,
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
        score: 5,
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
      description: 'S12-D3-A1',
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
      type: 'audio',
      body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S12-D3-A3.aac',
      description: 'S12D3_A3',
    },
  },
]
