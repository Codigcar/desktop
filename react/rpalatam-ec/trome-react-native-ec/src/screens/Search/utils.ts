export const computeEstimatedDate = (date: number): string => {
  const currentDate = new Date()
  const approx = currentDate.getDate() + date
  currentDate.setDate(approx)

  const month = `0${currentDate.getUTCMonth() + 1}`.slice(-2)
  const day = `0${currentDate.getUTCDate()}`.slice(-2)
  const year = currentDate.getUTCFullYear()

  return `${year}-${month}-${day}`
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
