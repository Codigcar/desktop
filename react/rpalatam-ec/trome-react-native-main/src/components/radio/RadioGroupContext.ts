import { createContext, useContext } from 'react'

interface Context {
  onPress: (value: string) => void
  value?: string
}

export const RadioGroupContext = createContext<Context | undefined>(undefined)

export const useRadioGroup = (): Context | undefined =>
  useContext(RadioGroupContext)
