/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormHandles } from '@unform/core'
import { RefObject } from 'react'

export type ItemProps = {
  children: JSX.Element
  error?: string
  label?: string
}

export type ValidationErros = {
  [key: string]: string
}

export type FormErrorsProps = {
  ref: RefObject<FormHandles>
  schema: any
}

export type FormErrorsReturn = {
  errors: ValidationErros
  setFieldError: (name: string, value: string | boolean) => Promise<void>
  setErrors: (errors: ValidationErros) => void
}
