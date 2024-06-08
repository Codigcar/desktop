import { useCallback, useState } from 'react'

import { FormErrorsProps, FormErrorsReturn, ValidationErros } from './types'

export const useFormErrors = ({
  ref: formRef,
  schema,
}: FormErrorsProps): FormErrorsReturn => {
  const [validationErrors, setValidationErros] = useState<ValidationErros>({})

  const handleChangeField = useCallback(
    async (name, value) => {
      const error = formRef.current?.getFieldError(name)
      const hasError = error && error.length > 0
      try {
        await schema.validate({ [name]: value })
        if (hasError) {
          formRef.current?.setFieldError(name, '')
          setValidationErros((prev) => ({ ...prev, [name]: '' }))
        }
      } catch (err) {
        if (err.inner[name] && (!error || error !== err.inner[name])) {
          formRef.current?.setFieldError(name, err.inner[name])
          setValidationErros((prev) => ({ ...prev, [name]: err.inner[name] }))
        } else if (!err.inner[name] && hasError) {
          formRef.current?.setFieldError(name, '')
          setValidationErros((prev) => ({ ...prev, [name]: '' }))
        }
      }
    },
    [formRef, schema],
  )

  const setErrors = useCallback(
    (errors) => {
      formRef.current?.setErrors(errors)
      setValidationErros(errors)
    },
    [formRef],
  )

  return {
    errors: validationErrors,
    setFieldError: handleChangeField,
    setErrors,
  }
}
