import QuestionModel from '../infrastructure/models/question.schema'
import { ISemanas } from './interfaces'
import { SEM1_D0 } from './rama_root/dia0'

export const TEMPLATE_MOCK = {
  category: 'template',
  body: 'hello_world',
  is_waiting_answer: true,
  value: {
    type: 'template',
    body: 'hello_world',
  },
  answers: [
    {
      option: 'A',
      score: 2,
      value: {
        type: 'text',
        body: '¡Gracias por compartir! ¡Me da gusto que estés bien; espero que tu semana siga muy bien!',
      },
    },
    {
      option: 'B',
      score: 2,
      value: {
        type: 'text',
        body: 'Amiga! Recuerda que a veces un mal día nos pasa a todas pero la semana siempre puede mejorar <3 ',
      },
    },
    {
      option: 'C',
      score: 2,
      value: {
        type: 'text',
        body: '¡Siento mucho que estés así! ¡Espero que tu semana mejore y que conversar conmigo hoy te suba el ánimo!',
      },
    },
  ],
}

type Props = {
  list: any
  initIndex: number
  num_sem: number
  num_day: number
  rama?: number
}


function generateListWithoutRama({ list, initIndex, num_sem, num_day }: Props) {
  const newList = list.map((item: ISemanas, index: number) => {
    // if (item.category === 'template' && Boolean(process.env.IS_ENABLE_TEMPLATES_MOCK)) {
    //   return {
    //     ...TEMPLATE_MOCK,
    //     module_id: '64bb77b6fff2293f0913dc6a',
    //     day_id: '6536e565fa97dcaae12a5616',
    //     day: num_day,
    //     module: num_sem,
    //     idx: initIndex,
    //     rama: 0,
    //   }
    // }

    return {
      ...item,
      module_id: '64bb77b6fff2293f0913dc6a',
      day_id: '6536e565fa97dcaae12a5616',
      day: num_day,
      module: num_sem,
      idx: initIndex + index,
      rama: 0,
    }
  })
  return newList
}

export const QuestionSeedRama0 = async () => {
  const sem1_dia0 = generateListWithoutRama({
    list: SEM1_D0,
    initIndex: 1001,
    num_sem: 1,
    num_day: 0,
  })

  // sem1
  await QuestionModel.insertMany(sem1_dia0)
}
