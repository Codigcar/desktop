import QuestionModel from '../infrastructure/models/question.schema'
import { TEMPLATE_MOCK } from './question.seed.rama0'

import { SEM1_D1 } from './rama_2/semana_1/dia1'
import { SEM1_D3 } from './rama_2/semana_1/dia3'
import { SEM10_D1 } from './rama_2/semana_10/dia1'
import { SEM10_D3 } from './rama_2/semana_10/dia3'
import { SEM11_D1 } from './rama_2/semana_11/dia1'
import { SEM11_D3 } from './rama_2/semana_11/dia3'
import { SEM12_D1 } from './rama_2/semana_12/dia1'
import { SEM2_D1 } from './rama_2/semana_2/dia1'
import { SEM2_D3 } from './rama_2/semana_2/dia3'
import { SEM3_D1 } from './rama_2/semana_3/dia1'
import { SEM3_D3 } from './rama_2/semana_3/dia3'
import { SEM4_D1 } from './rama_2/semana_4/dia1'
import { SEM4_D3 } from './rama_2/semana_4/dia3'
import { SEM5_D1 } from './rama_2/semana_5/dia1'
import { SEM5_D3 } from './rama_2/semana_5/dia3'
import { SEM6_D1 } from './rama_2/semana_6/dia1'
import { SEM6_D3 } from './rama_2/semana_6/dia3'
import { SEM7_D1 } from './rama_2/semana_7/dia1'
import { SEM7_D3 } from './rama_2/semana_7/dia3'
import { SEM8_D1 } from './rama_2/semana_8/dia1'
import { SEM8_D3 } from './rama_2/semana_8/dia3'
import { SEM9_D1 } from './rama_2/semana_9/dia1'
import { SEM9_D3 } from './rama_2/semana_9/dia3'

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
    //     rama: 2,
    //   }
    // }

    return {
      ...item,
      module_id: '64bb77b6fff2293f0913dc6a',
      day_id: '6536e565fa97dcaae12a5616',
      day: num_day,
      module: num_sem,
      idx: initIndex + index,
      rama: 2,
    }
  })
  return newList
}

export const QuestionSeedRama2 = async () => {
  const sem1_dia1 = generateList({
    list: SEM1_D1,
    initIndex: 21101,
    num_sem: 1,
    num_day: 1,
  })

  const sem1_dia3 = generateList({
    list: SEM1_D3,
    initIndex: 21301,
    num_sem: 1,
    num_day: 5,
  })

  const sem2_dia1 = generateList({
    list: SEM2_D1,
    initIndex: 22101,
    num_sem: 2,
    num_day: 1,
  })
  
  const sem2_dia3 = generateList({
    list: SEM2_D3,
    initIndex: 22301,
    num_sem: 2,
    num_day: 5,
  })
  
  const sem3_dia1 = generateList({
    list: SEM3_D1,
    initIndex: 23101,
    num_sem: 3,
    num_day: 1,
  })

  const sem3_dia3 = generateList({
    list: SEM3_D3,
    initIndex: 23301,
    num_sem: 3,
    num_day: 5,
  })

  const sem4_dia1 = generateList({
    list: SEM4_D1,
    initIndex: 24101,
    num_sem: 4,
    num_day: 1,
  })

  const sem4_dia3 = generateList({
    list: SEM4_D3,
    initIndex: 24301,
    num_sem: 4,
    num_day: 5,
  })

  const sem5_dia1 = generateList({
    list: SEM5_D1,
    initIndex: 25101,
    num_sem: 5,
    num_day: 1,
  })

  const sem5_dia3 = generateList({
    list: SEM5_D3,
    initIndex: 25301,
    num_sem: 5,
    num_day: 5,
  })

  const sem6_dia1 = generateList({
    list: SEM6_D1,
    initIndex: 26101,
    num_sem: 6,
    num_day: 1,
  })

  const sem6_dia3 = generateList({
    list: SEM6_D3,
    initIndex: 26301,
    num_sem: 6,
    num_day: 5,
  })

  const sem7_dia1 = generateList({
    list: SEM7_D1,
    initIndex: 27101,
    num_sem: 7,
    num_day: 1,
  })

  const sem7_dia3 = generateList({
    list: SEM7_D3,
    initIndex: 27301,
    num_sem: 7,
    num_day: 5,
  })

  const sem8_dia1 = generateList({
    list: SEM8_D1,
    initIndex: 28101,
    num_sem: 8,
    num_day: 1,
  })

  const sem8_dia3 = generateList({
    list: SEM8_D3,
    initIndex: 28301,
    num_sem: 8,
    num_day: 5,
  })

  const sem9_dia1 = generateList({
    list: SEM9_D1,
    initIndex: 29101,
    num_sem: 9,
    num_day: 1,
  })

  const sem9_dia3 = generateList({
    list: SEM9_D3,
    initIndex: 29301,
    num_sem: 9,
    num_day: 5,
  })

  const sem10_dia1 = generateList({
    list: SEM10_D1,
    initIndex: 2010101,
    num_sem: 10,
    num_day: 1,
  })

  const sem10_dia3 = generateList({
    list: SEM10_D3,
    initIndex: 2010301,
    num_sem: 10,
    num_day: 5,
  })

  const sem11_dia1 = generateList({
    list: SEM11_D1,
    initIndex: 2011101,
    num_sem: 11,
    num_day: 1,
  })

  const sem11_dia3 = generateList({
    list: SEM11_D3,
    initIndex: 2011501,
    num_sem: 11,
    num_day: 5,
  })

  const sem12_dia1 = generateList({
    list: SEM12_D1,
    initIndex: 2012101,
    num_sem: 12,
    num_day: 1,
  })

  const sem12_dia5 = generateList({
    list: SEM12_D1,
    initIndex: 2012501,
    num_sem: 12,
    num_day: 5,
  })

  // sem1
  await QuestionModel.insertMany(sem1_dia1)
  await QuestionModel.insertMany(sem1_dia3)

  // sem2
  await QuestionModel.insertMany(sem2_dia1)
  await QuestionModel.insertMany(sem2_dia3)

  // sem3
  await QuestionModel.insertMany(sem3_dia1)
  await QuestionModel.insertMany(sem3_dia3)

  // sem4
  await QuestionModel.insertMany(sem4_dia1)
  await QuestionModel.insertMany(sem4_dia3)

  // sem5
  await QuestionModel.insertMany(sem5_dia1)
  await QuestionModel.insertMany(sem5_dia3)

  // sem6
  await QuestionModel.insertMany(sem6_dia1)
  await QuestionModel.insertMany(sem6_dia3)

  // sem7
  await QuestionModel.insertMany(sem7_dia1)
  await QuestionModel.insertMany(sem7_dia3)

  // sem8
  await QuestionModel.insertMany(sem8_dia1)
  await QuestionModel.insertMany(sem8_dia3)

  // sem9
  await QuestionModel.insertMany(sem9_dia1)
  await QuestionModel.insertMany(sem9_dia3)

  // sem10
  await QuestionModel.insertMany(sem10_dia1)
  await QuestionModel.insertMany(sem10_dia3)

  // sem11
  await QuestionModel.insertMany(sem11_dia1)
  await QuestionModel.insertMany(sem11_dia3)

  // sem12
  await QuestionModel.insertMany(sem12_dia1)
  await QuestionModel.insertMany(sem12_dia5)
}
