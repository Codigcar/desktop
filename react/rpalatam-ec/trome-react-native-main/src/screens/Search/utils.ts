import type { FilterKeys } from '../../context/search'

export const computeEstimatedDate = (date: number): string => {
  const currentDate = new Date()
  const approx = currentDate.getDate() + date
  currentDate.setDate(approx)

  const month = `0${currentDate.getUTCMonth() + 1}`.slice(-2)
  const day = `0${currentDate.getUTCDate()}`.slice(-2)
  const year = currentDate.getUTCFullYear()

  return `${year}-${month}-${day}`
}

type Filters = Map<FilterKeys, string>

type FormData = {
  term: string
  section?: string
  searchDate?: string | number
  dateFrom?: Date
  dateTo?: Date
}

export function getFilters(filters: Filters, data: FormData): Filters {
  const next = new Map<FilterKeys, string>()
  next.set('term', data.term.trim())

  const lastSection = filters.get('section')
  if (lastSection && !data.section) next.set('section', lastSection)
  if (data.section) next.set('section', data.section)

  if (data.searchDate && data.searchDate !== 'custom') {
    next.set('dateFrom', computeEstimatedDate(+data.searchDate))
  }

  if (data.searchDate === 'custom') {
    const parsedFrom = parseDate(data.dateFrom)
    const parsedTo = parseDate(data.dateTo)
    if (parsedFrom) next.set('dateFrom', parsedFrom)
    if (parsedTo) next.set('dateTo', parsedTo)
  }

  const dateFrom = filters.get('dateFrom')
  const dateTo = filters.get('dateTo')
  if (!data.dateFrom && dateFrom) next.set('dateFrom', dateFrom)
  if (!data.dateTo && dateTo) next.set('dateTo', dateTo)
  return next
}

export const parseDate = (date?: Date): string | null => {
  if (!date) return null
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  const day = `0${date.getUTCDate()}`.slice(-2)
  const year = date.getUTCFullYear()

  return `${year}-${month}-${day}`
}

export const timeFrames = [
  {
    value: '',
    label: 'Cualquier fecha',
  },
  {
    value: '-1',
    label: 'Últimas 24 horas',
  },
  {
    value: '-7',
    label: 'Última semana',
  },
  {
    value: '-30',
    label: 'Último mes',
  },
  {
    value: 'custom',
    label: 'Personalizado',
  },
]
