import QuestionModel from '../infrastructure/models/question.schema'
import { TEMPLATE_MOCK } from './question.seed.rama0'
import { SEM1_D1 } from './rama_4/semana_1/dia1'
import { SEM1_D3 } from './rama_4/semana_1/dia3'
import { RAMA4_SEM10_D5 } from './rama_4/semana_10/dia3'
import { RAMA4_SEM11_D5 } from './rama_4/semana_11/dia3'
import { RAMA4_SEM12_D5 } from './rama_4/semana_12/dia3'
import { RAMA4_SEM2_D5 } from './rama_4/semana_2/dia3'
import { RAMA4_SEM3_D5 } from './rama_4/semana_3/dia5'
import { RAMA4_SEM4_D5 } from './rama_4/semana_4/dia3'
import { RAMA4_SEM5_D3 } from './rama_4/semana_5/dia3'
import { RAMA4_SEM6_D3 } from './rama_4/semana_6/dia3'
import { RAMA4_SEM7_D1 } from './rama_4/semana_7/dia1'
import { RAMA4_SEM7_D5 } from './rama_4/semana_7/dia3'
import { RAMA4_SEM8_D5 } from './rama_4/semana_8/dia3'
import { RAMA4_SEM9_D5 } from './rama_4/semana_9/dia3'

type Props = {
  list: any
  initIndex: number
  num_sem: number
  num_day: number
  rama?: number
}
function generateList({ list, initIndex, num_sem, num_day, rama = 4 }: Props) {
  const newList = list.map((item: any, index: number) => {
    // if (item.category === 'template' && Boolean(process.env.IS_ENABLE_TEMPLATES_MOCK)) {
    //   return {
    //     ...TEMPLATE_MOCK,
    //     module_id: '64bb77b6fff2293f0913dc6a',
    //     day_id: '6536e565fa97dcaae12a5616',
    //     day: num_day,
    //     module: num_sem,
    //     idx: initIndex,
    //     rama: 4,
    //   }
    // }

    return {
      ...item,
      module_id: '64bb77b6fff2293f0913dc6a',
      day_id: '6536e565fa97dcaae12a5616',
      day: num_day,
      module: num_sem,
      idx: initIndex + index,
      rama: 4,
    }
  })
  return newList
}


export const QuestionSeedRama4 = async () => {
  const sem1_dia1 = generateList({
    list: SEM1_D1,
    initIndex: 41101,
    num_sem: 1,
    num_day: 1,
  })

  const sem1_dia3 = generateList({
    list: SEM1_D3,
    initIndex: 41301,
    num_sem: 1,
    num_day: 5,
  })

  const rama4_sem2_dia5 = generateList({
    list: RAMA4_SEM2_D5,
    initIndex: 42501,
    num_sem: 2,
    num_day: 5,
  })

  const rama4_sem3_dia5 = generateList({
    list: RAMA4_SEM3_D5,
    initIndex: 43501,
    num_sem: 3,
    num_day: 5,
  })

  const rama4_sem4_dia5 = generateList({
    list: RAMA4_SEM4_D5,
    initIndex: 44501,
    num_sem: 4,
    num_day: 5,
  })

  const rama4_sem5_dia5 = generateList({
    list: RAMA4_SEM5_D3,
    initIndex: 45501,
    num_sem: 5,
    num_day: 5,
  })

  const rama4_sem6_dia5 = generateList({
    list: RAMA4_SEM6_D3,
    initIndex: 46501,
    num_sem: 6,
    num_day: 5,
  })

  const rama4_sem7_dia1 = generateList({
    list: RAMA4_SEM7_D1,
    initIndex: 47101,
    num_sem: 7,
    num_day: 1,
  })

  const rama4_sem7_dia5 = generateList({
    list: RAMA4_SEM7_D5,
    initIndex: 47501,
    num_sem: 7,
    num_day: 5,
  })

  const rama4_sem8_dia5 = generateList({
    list: RAMA4_SEM8_D5,
    initIndex: 48501,
    num_sem: 8,
    num_day: 5,
  })

  const rama4_sem9_dia5 = generateList({
    list: RAMA4_SEM9_D5,
    initIndex: 49501,
    num_sem: 9,
    num_day: 5,
  })

  const rama4_sem10_dia5 = generateList({
    list: RAMA4_SEM10_D5,
    initIndex: 410501,
    num_sem: 10,
    num_day: 5,
  })

  const rama4_sem11_dia5 = generateList({
    list: RAMA4_SEM11_D5,
    initIndex: 411501,
    num_sem: 11,
    num_day: 5,
  })

  const rama4_sem12_dia5 = generateList({
    list: RAMA4_SEM12_D5,
    initIndex: 412501,
    num_sem: 12,
    num_day: 5,
  })

  // sem1
  await QuestionModel.insertMany(sem1_dia1)
  await QuestionModel.insertMany(sem1_dia3)

  // sem2
  await QuestionModel.insertMany(rama4_sem2_dia5)

  // sem3
  await QuestionModel.insertMany(rama4_sem3_dia5)

  // sem4
  await QuestionModel.insertMany(rama4_sem4_dia5)

  // sem5
  await QuestionModel.insertMany(rama4_sem5_dia5)

  // sem6
  await QuestionModel.insertMany(rama4_sem6_dia5)

  // sem7
  await QuestionModel.insertMany(rama4_sem7_dia1)
  await QuestionModel.insertMany(rama4_sem7_dia5)
  
  // sem8
  await QuestionModel.insertMany(rama4_sem8_dia5)

  // sem9
  await QuestionModel.insertMany(rama4_sem9_dia5)

  // sem10
  await QuestionModel.insertMany(rama4_sem10_dia5)

  // sem11
  await QuestionModel.insertMany(rama4_sem11_dia5)

  // sem12
  await QuestionModel.insertMany(rama4_sem12_dia5)
}
