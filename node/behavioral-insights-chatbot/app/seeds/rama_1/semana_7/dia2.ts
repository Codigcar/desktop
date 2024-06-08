import { ISemanas } from '../../interfaces'

/* Día 2_S7: DIA 2_S7: Reflexión sobre tu legado */

export const SEM7_D2: ISemanas[] = [
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
          body: 'Amiga, quisiera tomar este día para que reflexionemos sobre qué quieres heredarle a tus hijos.\nTu legado son cosas bien grandes, ¡tan grandes que no caben en ningún lugar! Sobre tus valores, sobre cómo enfrentar la vida, sobre cómo mantener al cuerpo sano y sobre el amor hacia tus hijos',
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
          type: 'audio',
          body: 'https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/bit/audios/S7-D2-A1.aac',
          description: 'S7D2_A1',
        },
      },
    ],
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: '¿Qué te pareció el audio?',
    },
  },
  {
    category: 'question',
    is_waiting_answer: true,
    value: {
      type: 'interactive',
      body: '¿Estás de acuerdo con que nuestra herencia para nuestros bebés se verá reflejada en ellos por mucho tiempo?',
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
          body: 'Ahora, es momento de compartir. En una nota de audio, cuéntame cuál es tu legado para tus hijos. Piensa en las siguientes cosas que pueden ser lo que le heredes a tus hijos:',
        },
      },
      {
        option: 'No',
        score: 2,
        value: {
          type: 'text',
          body: 'Ahora, es momento de compartir. En una nota de audio, cuéntame cuál es tu legado para tus hijos. Piensa en las siguientes cosas que pueden ser lo que le heredes a tus hijos:',
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
        columns: ['fortress'],
      },
      type: 'text',
      body: '👉 Mis valores principales son *{{fortress}}*. ¿Me gusta vivir mi vida con estos valores? ¿Estos valores me ayudan a afrontar las distintas situaciones con las que me encuentro?\n👉 ¿Considero que soy una persona  dispuesta a ampliar mis conocimientos? ¿Trato de aplicar las tres AAA en mi vida diaria? ¿Atiendo, Aprendo y Adapto de todo el conocimiento que me llega de otros?\n👉 ¿Cuido su salud para que, a futuro, él crezca sano, fuerte, inteligente y también sepa cuidarse, incluso cuando yo ya no esté cerca para cuidarlo todo el tiempo?',
    },
  },
  {
    category: 'info',
    is_waiting_answer: false,
    value: {
      type: 'text',
      body: 'Grabar una nota de voz es una herramienta que a mí me sirve para expresarme y ordenar mis ideas y emociones.  ¡Cuéntame cuál es tu legado y gana 10 puntos también por compartir!',
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
    category: 'question_voice',
    is_waiting_answer: true,
    value: {
      type: 'text',
      body: 'Durante el tiempo que estaremos realizando actividades, estas notas de voz te ayudarán a reflexionar por ti misma sobre tus ideas y emociones para sentirte mejor. *¡Recuerda! Por cada nota que envías, ganarás 10 puntos que son más oportunidades de ganar en las rifas que haremos.*\n\n*Para grabar una nota de voz en WhatsApp, sigue estos pasos:*\n1. Mantén presionado el ícono del micrófono 🎙️ para grabar.\n2. Levanta el dedo para enviar automáticamente.\n3. Si quieres corregir, desliza el dedo a la izquierda para cancelar.',
    },
    answers: [
      {
        option: 'voice',
        score: 10,
        value: {
          type: 'text',
          body: '¡Muchas gracias por tu mensaje amiga!, lo escucharé pronto!\n¡Estoy segura de que tu herencia para tus hijos será muy útil y valiosa para ellos!',
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
      needDataFrom: {
        model: 'users',
        columns: ['name', 'score'],
      },
      type: 'text',
      body: '¡Termina el reto del día, *{{name}}*! ¡Has ganado *{{score}} PUNTOS* hoy por participar con tus respuestas! Recuerda, entre más puntos, ¡más chances de ganar en las rifas! Sigamos aprendiendo JUNTAS para ser las mejores mamás. ¡Te escribo pronto!',
    },
  },
]
