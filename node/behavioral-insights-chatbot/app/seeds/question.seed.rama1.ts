import QuestionModel from '../infrastructure/models/question.schema'
import { SEM1_D1 } from './rama_1/semana_1/dia1'
import { SEM1_D2 } from './rama_1/semana_1/dia2'
import { SEM1_D3 } from './rama_1/semana_1/dia3'
import { SEM10_D1 } from './rama_1/semana_10/dia1'
import { SEM10_D2 } from './rama_1/semana_10/dia2'
import { SEM10_D3 } from './rama_1/semana_10/dia3'
import { SEM11_D1 } from './rama_1/semana_11/dia1'
import { SEM11_D2 } from './rama_1/semana_11/dia2'
import { SEM11_D3 } from './rama_1/semana_11/dia3'
import { SEM2_D1 } from './rama_1/semana_2/dia1'
import { SEM2_D2 } from './rama_1/semana_2/dia2'
import { SEM2_D3 } from './rama_1/semana_2/dia3'
import { SEM3_D1 } from './rama_1/semana_3/dia1'
import { SEM3_D2 } from './rama_1/semana_3/dia2'
import { SEM3_D3 } from './rama_1/semana_3/dia3'
import { SEM4_D1 } from './rama_1/semana_4/dia1'
import { SEM4_D2 } from './rama_1/semana_4/dia2'
import { SEM4_D3 } from './rama_1/semana_4/dia3'
import { SEM5_D1 } from './rama_1/semana_5/dia1'
import { SEM5_D2 } from './rama_1/semana_5/dia2'
import { SEM5_D3 } from './rama_1/semana_5/dia3'
import { SEM6_D1 } from './rama_1/semana_6/dia1'
import { SEM6_D2 } from './rama_1/semana_6/dia2'
import { SEM6_D3 } from './rama_1/semana_6/dia3'
import { SEM7_D1 } from './rama_1/semana_7/dia1'
import { SEM7_D2 } from './rama_1/semana_7/dia2'
import { SEM7_D3 } from './rama_1/semana_7/dia3'
import { SEM8_D1 } from './rama_1/semana_8/dia1'
import { SEM8_D2 } from './rama_1/semana_8/dia2'
import { SEM8_D3 } from './rama_1/semana_8/dia3'
import { SEM9_D1 } from './rama_1/semana_9/dia1'
import { SEM9_D2 } from './rama_1/semana_9/dia2'
import { SEM9_D3 } from './rama_1/semana_9/dia3'
import { SEM12_D1 } from './rama_1/semana_12/dia1'
import { SEM12_D3 } from './rama_1/semana_12/dia3'
import { SEM12_D5 } from './rama_1/semana_12/dia5'
import { TEMPLATE_MOCK } from './question.seed.rama0'

type Props = {
  list: any
  initIndex: number
  num_sem: number
  num_day: number
  rama?: number
}

function generateList({ list, initIndex, num_sem, num_day }: Props) {
  const newList = list.map((item: any, index: number) => {
    // if (item.category === 'template' && Boolean(process.env.IS_ENABLE_TEMPLATES_MOCK)) {
    //   return {
    //     ...TEMPLATE_MOCK,
    //     module_id: '64bb77b6fff2293f0913dc6a',
    //     day_id: '6536e565fa97dcaae12a5616',
    //     day: num_day,
    //     module: num_sem,
    //     idx: initIndex,
    //     rama: 1,
    //   }
    // }

    return {
      ...item,
      module_id: '64bb77b6fff2293f0913dc6a',
      day_id: '6536e565fa97dcaae12a5616',
      day: num_day,
      module: num_sem,
      idx: initIndex + index,
      rama: 1,
    }
  })
  return newList
}

export const QuestionSeedRama1 = async () => {
  // await QuestionModel.deleteMany({})
  
  // if (process.env.IS_ENABLE_RESET_TABLES === 'true') {
  //   await UserQuestionsModel.deleteMany({})
  //   await UserMessagesModel.deleteMany({})
  // }

  const sem1_dia1 = generateList({
    list: SEM1_D1,
    initIndex: 1101,
    num_sem: 1,
    num_day: 1,
  })

  const sem1_dia2 = generateList({
    list: SEM1_D2,
    initIndex: 1201,
    num_sem: 1,
    num_day: 3,
  })

  const sem1_dia3 = generateList({
    list: SEM1_D3,
    initIndex: 1301,
    num_sem: 1,
    num_day: 5,
  })

  const sem2_dia1 = generateList({
    list: SEM2_D1,
    initIndex: 2101,
    num_sem: 2,
    num_day: 1,
  })

  const sem2_dia2 = generateList({
    list: SEM2_D2,
    initIndex: 2201,
    num_sem: 2,
    num_day: 3,
  })

  const sem2_dia3 = generateList({
    list: SEM2_D3,
    initIndex: 2301,
    num_sem: 2,
    num_day: 5,
  })

  const sem3_dia1 = generateList({
    list: SEM3_D1,
    initIndex: 3101,
    num_sem: 3,
    num_day: 1,
  })

  const sem3_dia2 = generateList({
    list: SEM3_D2,
    initIndex: 3201,
    num_sem: 3,
    num_day: 3,
  })

  const sem3_dia3 = generateList({
    list: SEM3_D3,
    initIndex: 3301,
    num_sem: 3,
    num_day: 5,
  })

  const sem4_dia1 = generateList({
    list: SEM4_D1,
    initIndex: 4101,
    num_sem: 4,
    num_day: 1,
  })

  const sem4_dia2 = generateList({
    list: SEM4_D2,
    initIndex: 4201,
    num_sem: 4,
    num_day: 3,
  })

  const sem4_dia3 = generateList({
    list: SEM4_D3,
    initIndex: 4301,
    num_sem: 4,
    num_day: 5,
  })

  const sem5_dia1 = generateList({
    list: SEM5_D1,
    initIndex: 5101,
    num_sem: 5,
    num_day: 1,
  })

  const sem5_dia2 = generateList({
    list: SEM5_D2,
    initIndex: 5201,
    num_sem: 5,
    num_day: 3,
  })

  const sem5_dia3 = generateList({
    list: SEM5_D3,
    initIndex: 5301,
    num_sem: 5,
    num_day: 5,
  })

  const sem6_dia1 = generateList({
    list: SEM6_D1,
    initIndex: 6101,
    num_sem: 6,
    num_day: 1,
  })

  const sem6_dia2 = generateList({
    list: SEM6_D2,
    initIndex: 6201,
    num_sem: 6,
    num_day: 3,
  })

  const sem6_dia3 = generateList({
    list: SEM6_D3,
    initIndex: 6301,
    num_sem: 6,
    num_day: 5,
  })

  const sem7_dia1 = generateList({
    list: SEM7_D1,
    initIndex: 7101,
    num_sem: 7,
    num_day: 1,
  })

  const sem7_dia2 = generateList({
    list: SEM7_D2,
    initIndex: 7201,
    num_sem: 7,
    num_day: 3,
  })

  const sem7_dia3 = generateList({
    list: SEM7_D3,
    initIndex: 7301,
    num_sem: 7,
    num_day: 5,
  })

  const sem8_dia1 = generateList({
    list: SEM8_D1,
    initIndex: 8101,
    num_sem: 8,
    num_day: 1,
  })

  const sem8_dia2 = generateList({
    list: SEM8_D2,
    initIndex: 8201,
    num_sem: 8,
    num_day: 3,
  })

  const sem8_dia3 = generateList({
    list: SEM8_D3,
    initIndex: 8301,
    num_sem: 8,
    num_day: 5,
  })

  const sem9_dia1 = generateList({
    list: SEM9_D1,
    initIndex: 9101,
    num_sem: 9,
    num_day: 1,
  })

  const sem9_dia2 = generateList({
    list: SEM9_D2,
    initIndex: 9201,
    num_sem: 9,
    num_day: 3,
  })

  const sem9_dia3 = generateList({
    list: SEM9_D3,
    initIndex: 9301,
    num_sem: 9,
    num_day: 5,
  })

  const sem10_dia1 = generateList({
    list: SEM10_D1,
    initIndex: 10101,
    num_sem: 10,
    num_day: 1,
  })

  const sem10_dia2 = generateList({
    list: SEM10_D2,
    initIndex: 10201,
    num_sem: 10,
    num_day: 3,
  })

  const sem10_dia3 = generateList({
    list: SEM10_D3,
    initIndex: 10301,
    num_sem: 10,
    num_day: 5,
  })

  const sem11_dia1 = generateList({
    list: SEM11_D1,
    initIndex: 11101,
    num_sem: 11,
    num_day: 1,
  })

  const sem11_dia2 = generateList({
    list: SEM11_D2,
    initIndex: 11201,
    num_sem: 11,
    num_day: 3,
  })

  const sem11_dia3 = generateList({
    list: SEM11_D3,
    initIndex: 11301,
    num_sem: 11,
    num_day: 5,
  })

  const sem12_dia1 = generateList({
    list: SEM12_D1,
    initIndex: 12101,
    num_sem: 12,
    num_day: 1,
  })

  const sem12_dia3 = generateList({
    list: SEM12_D3,
    initIndex: 12301,
    num_sem: 12,
    num_day: 3,
  })

  const sem12_dia5 = generateList({
    list: SEM12_D5,
    initIndex: 12501,
    num_sem: 12,
    num_day: 5,
  })

  // sem1
  await QuestionModel.insertMany(sem1_dia1)
  await QuestionModel.insertMany(sem1_dia2)
  await QuestionModel.insertMany(sem1_dia3)

  // sem2
  await QuestionModel.insertMany(sem2_dia1)
  await QuestionModel.insertMany(sem2_dia2)
  await QuestionModel.insertMany(sem2_dia3)

  // sem3
  await QuestionModel.insertMany(sem3_dia1)
  await QuestionModel.insertMany(sem3_dia2)
  await QuestionModel.insertMany(sem3_dia3)

  // sem4
  await QuestionModel.insertMany(sem4_dia1)
  await QuestionModel.insertMany(sem4_dia2)
  await QuestionModel.insertMany(sem4_dia3)

  // sem5
  await QuestionModel.insertMany(sem5_dia1)
  await QuestionModel.insertMany(sem5_dia2)
  await QuestionModel.insertMany(sem5_dia3)

  // sem6
  await QuestionModel.insertMany(sem6_dia1)
  await QuestionModel.insertMany(sem6_dia2)
  await QuestionModel.insertMany(sem6_dia3)

  // sem7
  await QuestionModel.insertMany(sem7_dia1)
  await QuestionModel.insertMany(sem7_dia2)
  await QuestionModel.insertMany(sem7_dia3)

  // sem8
  await QuestionModel.insertMany(sem8_dia1)
  await QuestionModel.insertMany(sem8_dia2)
  await QuestionModel.insertMany(sem8_dia3)

  // sem9
  await QuestionModel.insertMany(sem9_dia1)
  await QuestionModel.insertMany(sem9_dia2)
  await QuestionModel.insertMany(sem9_dia3)

  // sem10
  await QuestionModel.insertMany(sem10_dia1)
  await QuestionModel.insertMany(sem10_dia2)
  await QuestionModel.insertMany(sem10_dia3)

  // sem11
  await QuestionModel.insertMany(sem11_dia1)
  await QuestionModel.insertMany(sem11_dia2)
  await QuestionModel.insertMany(sem11_dia3)

  // sem15
  await QuestionModel.insertMany(sem12_dia1)
  await QuestionModel.insertMany(sem12_dia3)
  await QuestionModel.insertMany(sem12_dia5)
}
