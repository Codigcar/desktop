function subtractDays(days) {
  const dateCopy = new Date()
  dateCopy.setDate(dateCopy.getDate() - days)
  return dateCopy.toISOString().split('T')[0]
}

module.exports = subtractDays
