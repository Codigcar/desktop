import { useCallback, useEffect, useState } from 'react'

type useCountDownParams = {
  initialTimeSeconds: number
  intervalMiliSeconds?: number
  autoplay?: boolean
}

type useCountDownBag = {
  isComplete: boolean
  remainingTime: number
  startCounter: () => void
  stopCounter: () => void
  resetCounter: () => void
  isRunning: boolean
}

const useCounter = (params: useCountDownParams): useCountDownBag => {
  const [remainingTime, setRemainingTime] = useState(
    () => params.initialTimeSeconds,
  )
  const [isComplete, setIsComplete] = useState(false)
  const [isEnabled, setIsEnabled] = useState(!!params.autoplay)

  const { intervalMiliSeconds } = params

  useEffect(() => {
    if (isEnabled) {
      const timeout = setTimeout(() => {
        setRemainingTime(remainingTime - 1)
      }, intervalMiliSeconds || 1000)

      if (remainingTime <= 0) {
        clearTimeout(timeout)
        setIsComplete(true)
      }
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [remainingTime, intervalMiliSeconds, isEnabled])

  const startCounter = useCallback(() => {
    setIsEnabled(true)
  }, [])

  const stopCounter = useCallback(() => {
    setIsEnabled(false)
  }, [])

  const resetCounter = useCallback(() => {
    setIsComplete(false)
    setRemainingTime(params.initialTimeSeconds)
    setIsEnabled(false)
  }, [params.initialTimeSeconds])

  return {
    isComplete,
    remainingTime,
    startCounter,
    stopCounter,
    resetCounter,
    isRunning: isEnabled,
  }
}

export default useCounter
