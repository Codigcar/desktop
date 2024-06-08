type Count = {
  value: number
  prevValue?: number
  expires: number
  ids?: []
}

interface Counter {
  name: string
  initialValue?: number
  expires: number
  fulfilled(count: Count): any
  failed(count: Count): any
}

export const createCounter = ({
  name,
  initialValue = 0,
  expires,
  fulfilled,
  failed,
}: Counter): Promise<Count> =>
  new Promise(resolve => {
    const today = new Date()

    // Previous values
    const counterStorage = JSON.parse(
      localStorage.getItem('counterStorage') || '{}',
    )
    let counter = counterStorage[name] || {}
    const prevValue = Number.isInteger(counter.value)
      ? counter.value
      : initialValue
    const prevExpires = counter.expires || expires

    // Validate expiration and set value
    // let value;
    if (today.getTime() > prevExpires) {
      // value = fulfilled(prevValue);
      const { value, ...otherValues } = fulfilled({
        ...counter,
        value: prevValue,
      })
      counter = { ...otherValues, value }
      counter.expires = expires
    } else {
      // value = failed(prevValue);
      const { value, ...otherValues } = failed({
        ...counter,
        value: prevValue,
      })
      counter = { ...otherValues, value }
      counter.expires = prevExpires
    }
    // counter.value = value;

    // Save new count
    counterStorage[name] = counter
    localStorage.counterStorage = JSON.stringify(counterStorage)
    return resolve({ ...counter, value: counter.value, prevValue })
  })

export const getCounter = name => {
  const counterStorage = JSON.parse(
    localStorage.getItem('counterStorage') || '{}',
  )
  return counterStorage[name]
}

export const removeCounter = name => {
  const counterStorage = JSON.parse(
    localStorage.getItem('counterStorage') || '{}',
  )
  delete counterStorage[name]
  localStorage.counterStorage = JSON.stringify(counterStorage)
}
