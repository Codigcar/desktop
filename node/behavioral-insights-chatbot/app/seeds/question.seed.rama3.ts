import QuestionModel from '../infrastructure/models/question.schema'
import { SEM1_D2 } from './rama_3/semana_1/dia2'
import { SEM1_D3 } from './rama_3/semana_1/dia3'
import { SEM2_D2 } from './rama_3/semana_2/dia2'
import { SEM2_D3 } from './rama_3/semana_2/dia3'
import { SEM3_D2 } from './rama_3/semana_3/dia2'
import { SEM3_D3 } from './rama_3/semana_3/dia3'
import { SEM4_D2 } from './rama_3/semana_4/dia2'
import { SEM4_D3 } from './rama_3/semana_4/dia3'
import { SEM5_D2 } from './rama_3/semana_5/dia2'
import { SEM5_D3 } from './rama_3/semana_5/dia3'
import { SEM6_D2 } from './rama_3/semana_6/dia2'
import { SEM6_D3 } from './rama_3/semana_6/dia3'
import { SEM7_D2 } from './rama_3/semana_7/dia2'
import { SEM7_D3 } from './rama_3/semana_7/dia3'
import { SEM8_D2 } from './rama_3/semana_8/dia2'
import { SEM8_D3 } from './rama_3/semana_8/dia3'
import { SEM9_D2 } from './rama_3/semana_9/dia2'
import { SEM9_D3 } from './rama_3/semana_9/dia3'
import { SEM12_D3 } from './rama_3/semana_12/dia3'
import { SEM12_D5 } from './rama_3/semana_12/dia5'
import { SEM10_D2 } from './rama_3/semana_10/dia2'
import { SEM10_D3 } from './rama_3/semana_10/dia3'
import { SEM11_D2 } from './rama_3/semana_11/dia2'
import { SEM11_D3 } from './rama_3/semana_11/dia3'
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
      rama: 3,
    }
  })
  return newList
}

export const QuestionSeedRama3 = async () => {
  // await QuestionModel.deleteMany({})
  
  // if (process.env.IS_ENABLE_RESET_TABLES === 'true') {
  //   await UserQuestionsModel.deleteMany({})
  //   await UserMessagesModel.deleteMany({})
  // }


  const sem1_dia2 = generateList({
    list: SEM1_D2,
    initIndex: 30001201,
    num_sem: 1,
    num_day: 3,
  })

  const sem1_dia3 = generateList({
    list: SEM1_D3,
    initIndex: 30001301,
    num_sem: 1,
    num_day: 5,
  })

  const sem2_dia2 = generateList({
    list: SEM2_D2,
    initIndex: 30002201,
    num_sem: 2,
    num_day: 3,
  })

  const sem2_dia3 = generateList({
    list: SEM2_D3,
    initIndex: 30002301,
    num_sem: 2,
    num_day: 5,
  })


  const sem3_dia2 = generateList({
    list: SEM3_D2,
    initIndex: 30003201,
    num_sem: 3,
    num_day: 3,
  })

  const sem3_dia3 = generateList({
    list: SEM3_D3,
    initIndex: 30003301,
    num_sem: 3,
    num_day: 5,
  })

  const sem4_dia2 = generateList({
    list: SEM4_D2,
    initIndex: 30004201,
    num_sem: 4,
    num_day: 3,
  })

  const sem4_dia3 = generateList({
    list: SEM4_D3,
    initIndex: 30004301,
    num_sem: 4,
    num_day: 5,
  })


  const sem5_dia2 = generateList({
    list: SEM5_D2,
    initIndex: 30005201,
    num_sem: 5,
    num_day: 3,
  })

  const sem5_dia3 = generateList({
    list: SEM5_D3,
    initIndex: 30005301,
    num_sem: 5,
    num_day: 5,
  })

  const sem6_dia2 = generateList({
    list: SEM6_D2,
    initIndex: 30006201,
    num_sem: 6,
    num_day: 3,
  })

  const sem6_dia3 = generateList({
    list: SEM6_D3,
    initIndex: 30006301,
    num_sem: 6,
    num_day: 5,
  })

  const sem7_dia2 = generateList({
    list: SEM7_D2,
    initIndex: 30007201,
    num_sem: 7,
    num_day: 3,
  })

  const sem7_dia3 = generateList({
    list: SEM7_D3,
    initIndex: 30007301,
    num_sem: 7,
    num_day: 5,
  })

  const sem8_dia2 = generateList({
    list: SEM8_D2,
    initIndex: 30008201,
    num_sem: 8,
    num_day: 3,
  })

  const sem8_dia3 = generateList({
    list: SEM8_D3,
    initIndex: 30008301,
    num_sem: 8,
    num_day: 5,
  })

  const sem9_dia2 = generateList({
    list: SEM9_D2,
    initIndex: 30009201,
    num_sem: 9,
    num_day: 3,
  })

  const sem9_dia3 = generateList({
    list: SEM9_D3,
    initIndex: 30009301,
    num_sem: 9,
    num_day: 5,
  })

  const sem10_dia2 = generateList({
    list: SEM10_D2,
    initIndex: 300010201,
    num_sem: 10,
    num_day: 3,
  })

  const sem10_dia3 = generateList({
    list: SEM10_D3,
    initIndex: 300010301,
    num_sem: 10,
    num_day: 5,
  })

  const sem11_dia2 = generateList({
    list: SEM11_D2,
    initIndex: 300011201,
    num_sem: 11,
    num_day: 3,
  })

  const sem11_dia3 = generateList({
    list: SEM11_D3,
    initIndex: 300011301,
    num_sem: 11,
    num_day: 5,
  })

  const sem12_dia3 = generateList({
    list: SEM12_D3,
    initIndex: 300012301,
    num_sem: 12,
    num_day: 3,
  })

  const sem12_dia5 = generateList({
    list: SEM12_D5,
    initIndex: 300012501,
    num_sem: 12,
    num_day: 5,
  })

  // sem1
  await QuestionModel.insertMany(sem1_dia2)
  await QuestionModel.insertMany(sem1_dia3)

  // sem2
  await QuestionModel.insertMany(sem2_dia2)
  await QuestionModel.insertMany(sem2_dia3)

  // sem3
  await QuestionModel.insertMany(sem3_dia2)
  await QuestionModel.insertMany(sem3_dia3)

  // sem4
  await QuestionModel.insertMany(sem4_dia2)
  await QuestionModel.insertMany(sem4_dia3)

  // sem5
  await QuestionModel.insertMany(sem5_dia2)
  await QuestionModel.insertMany(sem5_dia3)

  // sem6
  await QuestionModel.insertMany(sem6_dia2)
  await QuestionModel.insertMany(sem6_dia3)

  // sem7
  await QuestionModel.insertMany(sem7_dia2)
  await QuestionModel.insertMany(sem7_dia3)

  // sem8
  await QuestionModel.insertMany(sem8_dia2)
  await QuestionModel.insertMany(sem8_dia3)

  // sem9
  await QuestionModel.insertMany(sem9_dia2)
  await QuestionModel.insertMany(sem9_dia3)

  // sem10
  await QuestionModel.insertMany(sem10_dia2)
  await QuestionModel.insertMany(sem10_dia3)

  // sem11
  await QuestionModel.insertMany(sem11_dia2)
  await QuestionModel.insertMany(sem11_dia3)

  // sem15
  await QuestionModel.insertMany(sem12_dia3)
  await QuestionModel.insertMany(sem12_dia5)
}
