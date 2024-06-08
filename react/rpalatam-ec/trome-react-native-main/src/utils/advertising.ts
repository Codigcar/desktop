import { App } from './config'
import { Advertising } from '../entities/Advertising'
import { getRemoteValue } from '../utils/firebase'

type AdNewsListType = 'free' | 'premium'

type AdNewsListTypeConfig = {
  positions: number[]
  size: string
  sizes: string[]
}

function getAdSlots({
  positions,
  size,
  sizes,
}: AdNewsListTypeConfig): Record<number, Advertising> {
  const slots: Record<number, Advertising> = {}
  positions.forEach((position: number, index: number) => {
    slots[position] = new Advertising({
      id: `/28253241/${App.key}/pwa/sect/default/caja${index + 1}`,
      size,
      sizes,
    })
  })
  return slots
}

export function getAdNewsListConfig(): Record<
  AdNewsListType,
  Record<number, Advertising>
> {
  const config = getRemoteValue('ad_news_list').asString()
  const { free, premium } = JSON.parse(config)
  return { free: getAdSlots(free), premium: getAdSlots(premium) }
}
