import RelativeTimeFormat from 'relative-time-format'
import es from 'relative-time-format/locale/es-MX'
import { App } from './config'

export function getDomain(): string {
  return App.select({
    depor: 'depor.com',
    elcomercio: 'elcomercio.pe',
    gestion: 'gestion.pe',
    peru21: 'peru21.pe',
    trome: 'trome.pe',
  })
}

type RelativeTimeFormatUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'

const intervals: { unit: RelativeTimeFormatUnit; seconds: number }[] = [
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 },
]

const dtf = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
RelativeTimeFormat.addLocale(es)
const rtf = new RelativeTimeFormat('es-MX', { style: 'short' })
export const timeSince = (input: string): string | null => {
  try {
    const date = new Date(input)
    const seconds = (date.getTime() - Date.now()) / 1000
    const interval = intervals.find((i) => i.seconds < Math.abs(seconds))
    if (!interval || interval.unit === 'day') {
      return dtf.format(date).replace(/\//g, '.')
    }
    return rtf.format(Math.round(seconds / interval.seconds), interval.unit)
  } catch (_) {
    return null
  }
}

export function queryString(
  obj: { [key: string]: string | boolean | number },
  prefix = true,
): string {
  const str: string[] = []
  for (const p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  const stringPrefix = prefix ? '?' : ''
  return str.length ? stringPrefix.concat(str.join('&')) : ''
}

export function supportRemoteFavorites(): boolean {
  const brandsWithFavorites = ['elcomercio', 'gestion']
  return brandsWithFavorites.includes(App.key)
}

export function insertIntoArray<A, O>(
  arr: A[],
  obj: { [key: number]: O },
): (A | O)[] {
  const keys = Object.keys(obj)
  const elements: (A | O)[] = [...arr]
  keys.forEach((key) => {
    const index = Number(key)
    if (index <= arr.length) {
      elements.splice(index, 0, obj[index])
    }
  })
  return elements
}

export function mapToObject<TypeObject>(
  map: Map<string, TypeObject>,
): Record<string, TypeObject> {
  return [...map.entries()].reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value,
    }
  }, {})
}

export function cleanText(text?: string): string {
  if (!text) return ''
  return /^(undefined|null|-)$/i.test(text) ? '' : text
}
