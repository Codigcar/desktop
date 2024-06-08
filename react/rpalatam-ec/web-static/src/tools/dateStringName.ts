type Options = {
  weekday?: string
  day?: string
  month?: string
  year?: string
}

const dateStringName = (
  _date,
  options: Options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  },
) => {
  const date = new Date(_date.concat(' 0:00'))
  return date.toLocaleDateString('es-ES', options)
}

export default dateStringName
