import { FormHandles, SubmitHandler } from '@unform/core'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { useFormErrors } from '../components/Form'
import { ValidationErros } from '../components/Form/types'
import { useAuth } from '../context/auth'
import { useNotification } from '../context/notification'
import auth from '../services/auth'
import { App } from '../utils/config'
import * as Schema from '../utils/validation'

type UseAuthInformation = {
  errors: ValidationErros
  formRef: React.RefObject<FormHandles>
  isSubmitted: boolean
  setFieldError: (name: string, value: string | boolean) => Promise<void>
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
  updateInformation: SubmitHandler
}

export const formRef = React.createRef<FormHandles>()
export const useAuthInformation = (
  ProfileSchema: ReturnType<typeof Schema.object>,
): UseAuthInformation => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const notification = useNotification()
  const { user, updateUserProfile } = useAuth()

  const { errors, setFieldError, setErrors } = useFormErrors({
    ref: formRef,
    schema: ProfileSchema,
  })

  const updateInformation: SubmitHandler = async (data) => {
    try {
      setIsSubmitted(true)
      await ProfileSchema.validate(data)
      const metadata = Object.assign({}, user.user_metadata, data.user_metadata)
      const profile = await auth.updateProfile({
        ...data,
        user_metadata: metadata,
      })
      await updateUserProfile(profile)
      setIsSubmitted(false)
      setErrors({ 'user_metadata.documentNumber': '' })
      notification.show({
        message:
          App.key === 'elcomercio'
            ? 'Datos actualizados correctamente'
            : 'Tus datos fueron actualizados',
        type: 'success',
      })
    } catch (error) {
      setIsSubmitted(false)
      let message = 'No se pudo actualizar el perfil. Vuelve a intentarlo'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) {
        message = error.message
      }
      notification.show({ message, type: 'error' })
    }
  }

  return {
    errors,
    formRef,
    isSubmitted,
    setFieldError,
    setIsSubmitted,
    updateInformation,
  }
}
