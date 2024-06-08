import { useCallback, useEffect, useState } from 'react'

type UseDebounceHelpers = {
  debounceValue: boolean
  triggerDebounceValue: () => void
}

const useDebounceValue = (debounceMilliseconds = 800): UseDebounceHelpers => {
  const [debounceValue, setDebounceValue] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!debounceValue) {
        setDebounceValue(true)
      }
    }, debounceMilliseconds)

    return () => {
      clearTimeout(timeout)
    }
  }, [debounceValue, debounceMilliseconds])

  const triggerDebounceValue = useCallback(() => {
    setDebounceValue(false)
  }, [])

  return {
    debounceValue,
    triggerDebounceValue,
  }
}

export default useDebounceValue
