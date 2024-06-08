export const dataMock = {
  data: [
    {
      module: {
        idx: 1,
        name: 'Semana 2 - Módulo Marita y la Lactancia Materna',
        days: [
          {
            idx: 1,
            name: 'Lactancia y la historia de Marita',
            questions: [
              {
                idx: 1,
                category: 'initial',
                type: 'template',
                body: 'hello_world',
                is_waiting_answer: true,
                answers: [
                  {
                    option: 'A',
                    type: 'text',
                    body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana siga muy bien!',
                    score: 2,
                  },
                  {
                    option: 'B',
                    type: 'text',
                    body: 'Amiga! Recuerda que a veces un mal día nos pasa a todas pero la semana siempre puede mejorar <3 ',
                    score: 2,
                  },
                  {
                    option: 'C',
                    type: 'text',
                    body: '¡Siento mucho que estés así! ¡Espero que tu semana mejore y que conversar conmigo hoy te suba el ánimo!',
                    score: 2,
                  },
                ],
              },
              {
                idx: 2,
                category: 'question',
                question_type: 'text_audio',
                is_waiting_answer: true,
                question_body: [
                  {
                    type: 'text',
                    body: 'Esta semana, quiero presentarte a Marita. Ella tiene 18 años, se juntó con su pareja hace dos años y ¡tiene a su primer bebé!',
                  },
                  {
                    type: 'audio',
                    body: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Interloper_%28ISRC_USUAN1100401%29.aac',
                  },
                  {
                    type: 'audio',
                    body: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Interloper_%28ISRC_USUAN1100401%29.aac',
                  },
                  {
                    type: 'text',
                    body: 'Tu misión de esta semana es ayudar a esta mamá a encontrar la respuesta correcta para cada pregunta. Cada pregunta tiene algunas opciones, una es mejor que las otras. En cada una, ¿cuál crees que es la correcta?',
                  },
                  {
                    type: 'interactive',
                    body: '¿Cómo puedo alimentar a mi bebé entre 0 y 6 meses de edad?\nA. Le puedes dar agüitas desde que nace como infusiones y agua hervida, y después leche materna\nB. Le puedes dar todo lo que sea líquido o comiditas muy moliditas o licuadas si ves que tiene bastante apetito\nC. Lo mejor que puedes hacer es darle tu leche materna que tiene todo lo que tu bebé necesita para estar bien nutrido, y darle pecho desde la primera hora de vida',
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
                ],
                answers: [
                  {
                    option: 'A',
                    type: 'audio',
                    body: 'www.audio_S2D1_A3.com',
                    score: 2,
                  },
                  {
                    option: 'B',
                    type: 'audio',
                    body: 'www.audio_S2D1_A3.com',
                    score: 2,
                  },
                  {
                    option: 'C',
                    type: 'audio',
                    body: 'www.audio_S2D1_A4.com',
                    score: 3,
                  },
                ],
              },
              {
                idx: 3,
                category: 'question',
                question_type: 'text_audio',
                is_waiting_answer: true,
                question_body: [
                  {
                    type: 'interactive',
                    body: '¿Cómo puedo hacer para que mi bebé pueda succionar mejor mi leche?\nA. Debes darle otros alimentos líquidos como agüitas y el líquido de la sopita, para que no se quede sin nada en el estómago\nB. Debes buscar una posición adecuada, en la que estés cómoda y acercándole su boquita al pezón para que succione tu leche. Así, podrás lograr que tu bebé tenga una buena succión de tu leche sin absorber mucho aire hacia su estómago\nC. Debes dejarlo que pase más tiempo y cuando tenga más hambre va a poder succionar mejor',
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
                ],
                answers: [
                  {
                    option: 'A',
                    type: 'audio',
                    body: 'www.audio_S2D1_A5.com',
                    score: 2,
                  },
                  {
                    option: 'B',
                    type: 'audio',
                    body: 'www.audio_S2D1_A6.com',
                    score: 3,
                  },
                  {
                    option: 'C',
                    type: 'audio',
                    body: 'www.audio_S2D1_A5.com',
                    score: 2,
                  },
                ],
              },
              {
                idx: 4,
                category: 'question',
                question_type: 'text',
                is_waiting_answer: true,
                question_body: [
                  {
                    type: 'interactive',
                    body: '¿Qué hago si no tengo suficiente leche? ¿Será que simplemente no puedo producir leche?\nA. Puedes tomar agua de avena que es un remedio natural y tradicional de nuestras abuelas\nB. Sin tener que ir al médico, puedes ir por tu cuenta a la farmacia y comprar fórmula láctea y apoyarte de ella cuando sientas que no produces mucha leche y así ya no tienes que desgastarte tanto en intentarlo\nC. Tienes que estimular tus pechos con la succión continua del bebé y con masajes; también, comer bien, y beber muchos líquidos',
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
                ],
                answers: [
                  {
                    option: 'A',
                    type: 'audio',
                    body: 'www.audio_S2D1_A7.com',
                    score: 2,
                  },
                  {
                    option: 'B',
                    type: 'audio',
                    body: 'www.audio_S2D1_A7.com',
                    score: 2,
                  },
                  {
                    option: 'C',
                    type: 'audio',
                    body: 'www.audio_S2D1_A8.com',
                    score: 3,
                  },
                ],
              },
              {
                idx: 5,
                category: 'question',
                question_type: 'text_audio',
                is_waiting_answer: true,
                question_body: [
                  {
                    type: 'text',
                    body: 'Marita dijo: “Yo siento que como madre debo priorizar a mi bebé y no debería importar si a veces yo no tengo tiempo de comer y descansar un poco.”',
                  },
                  {
                    type: 'interactive',
                    body: '¿Qué le dirías a Marita? ¡Escoge una opción!\nA. “¡No, amiga! Aunque es normal sentirse así, una buena mamá pone primero su bienestar físico y emocional para poder darle lo mejor y toda la salud a sus bebés, especialmente a través de su leche, pues por ahí pasa todo. Si la mamá no está bien, no puede nutrir bien a su bebé\nB. “Amiga, a veces es muy difícil atender a la familia y hacer todas las labores que debemos hacer en nuestro rol de buenas madres y encargadas de la casa. Ante esa situación, los hijos siempre son primero, sin importar otra cosa.”',
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
                ],
                answers: [
                  {
                    option: 'A',
                    type: 'audio',
                    body: 'www.audio_S2D1_A9.com',
                    score: 3,
                  },
                  {
                    option: 'B',
                    type: 'audio',
                    body: 'www.audio_S2D1_A10.com',
                    score: 2,
                  },
                ],
              },
              {
                idx: 6,
                category: 'question',
                question_type: 'text',
                is_waiting_answer: true,
                question_body: [
                  {
                    type: 'text',
                    body: '¿Te gustaría aprender más de alguno de los temas con los que le ayudamos a Marita?',
                  },
                  {
                    type: 'interactive',
                    body: '¡Escoge una opción!\nA. ¡Sí! Quiero aprender más de consejos y posiciones para dar el pecho\nB. ¡Sí! Quiero aprender más de cómo estimular mis pechos para producir más leche\nC. ¡No! Por ahora no, gracias',
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
                ],
                answers: [
                  {
                    option: 'A',
                    type: 'Text',
                    body: 'Te dejo una infografía con más información del tema. Si tienes más dudas, puedes consultar este enlace o preguntarme para darte información útil escribiendo “Más información”.',
                    score: 2,
                  },
                  {
                    option: 'B',
                    type: 'Text',
                    body: 'Te dejo una infografía con más información del tema. Si tienes más dudas, puedes consultar este enlace o preguntarme para darte información útil escribiendo “Más información”.',
                    score: 2,
                  },
                  {
                    option: 'C',
                    type: 'Text',
                    body: 'Te dejo una infografía con más información del tema. Si tienes más dudas, puedes consultar este enlace o preguntarme para darte información útil escribiendo “Más información”.',
                    score: 2,
                  },
                ],
              },
              {
                idx: 7,
                category: 'info',
                question_type: 'text',
                is_waiting_answer: true,
                question_body: [
                  {
                    type: 'text',
                    body: '¿Te gustaría aprender más de alguno de los temas con los que le ayudamos a Marita?',
                  },
                  {
                    type: 'interactive',
                    body: '¡Escoge una opción!\nA. ¡Sí! Quiero aprender más de consejos y posiciones para dar el pecho\nB. ¡Sí! Quiero aprender más de cómo estimular mis pechos para producir más leche\nC. ¡No! Por ahora no, gracias',
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
                ],
                answers: [
                  {
                    option: 'A',
                    type: 'Text',
                    body: 'Te dejo una infografía con más información del tema. Si tienes más dudas, puedes consultar este enlace o preguntarme para darte información útil escribiendo “Más información”.',
                    score: 2,
                  },
                  {
                    option: 'B',
                    type: 'Text',
                    body: 'Te dejo una infografía con más información del tema. Si tienes más dudas, puedes consultar este enlace o preguntarme para darte información útil escribiendo “Más información”.',
                    score: 2,
                  },
                  {
                    option: 'C',
                    type: 'Text',
                    body: 'Te dejo una infografía con más información del tema. Si tienes más dudas, puedes consultar este enlace o preguntarme para darte información útil escribiendo “Más información”.',
                    score: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
}
