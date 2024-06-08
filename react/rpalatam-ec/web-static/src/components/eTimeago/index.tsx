import React from 'react'
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter({
  prefixAgo: 'hace',
  prefixFromNow: 'dentro de',
  suffixAgo: '',
  suffixFromNow: '',
  seconds: 'menos de 1 min',
  minute: '%d min',
  minutes: '%d min',
  hour: '%d h',
  hours: '%d h',
  day: 'un día',
  days: '%d días',
  month: 'un mes',
  months: '%d meses',
  year: 'un año',
  years: '%d años',
})

interface Props {
  date: string
  minPeriod?: number
}

const ETimeago: React.FC<Props> = props => {
  return <TimeAgo {...props} formatter={formatter} />
}

ETimeago.defaultProps = {
  minPeriod: 60,
}

export default React.memo(ETimeago)
