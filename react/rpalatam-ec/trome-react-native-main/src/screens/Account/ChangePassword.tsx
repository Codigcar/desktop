import { useNavigation } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useEffect, useRef, useState } from 'react'
import { BackHandler, Keyboard } from 'react-native'

import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem, useFormErrors } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Ribbon from '../../components/ribbon'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import * as Schema from '../../utils/validation'
import type { AccountStackScreenProps } from '../../routes/types'

const { ScrollView, View } = Box

const ChangePasswordSchema = Schema.object().shape({
  oldPassword: Schema.string().required(),
  newPassword: Schema.string()
    .min(8)
    .matches(/\s/g, 'No se permiten espacios vacíos')
    .required(),
})

const ChangePassword: React.FC = () => {
  const navigation =
    useNavigation<AccountStackScreenProps<'ChangePassword'>['navigation']>()
  const notification = useNotification()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    ref: formRef,
    schema: ChangePasswordSchema,
  })

  const handleSubmit: SubmitHandler = async (data) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await ChangePasswordSchema.validate(data)
      await auth.updatePassword(data.oldPassword, data.newPassword)
      notification.show({
        message: 'Tu contraseña fue actualizada',
        type: 'success',
      })
      navigation.navigate('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      })
    } catch (err) {
      if (err instanceof Schema.ValidationError) {
        setErrors(err.inner)
      } else if (err instanceof Error) {
        const message = err.message.includes('300040')
          ? 'Contraseña incorrecta'
          : 'No se pudo actualizar tu contraseña'
        notification.show({ message, type: 'error' })
      }
      setIsSubmitted(false)
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isSubmitted,
    )
    return backHandler.remove
  }, [isSubmitted])

  const style = { flexGrow: 1 }

  return (
    <View bg="background" flex={1}>
      <Ribbon title="Cambiar contraseña" />
      <ScrollView contentContainerStyle={style}>
        <View px="0.75" pt="1" pb="1.5">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormItem label="Actual contraseña" error={errors.oldPassword}>
              <Input.Password
                name="oldPassword"
                accessibilityLabel="actual contraseña"
                autoCapitalize="none"
                autoFocus
                onValueChange={(newValue) =>
                  setFieldError('oldPassword', newValue)
                }
                onSubmitEditing={() => {
                  formRef.current?.getFieldRef('newPassword').focus()
                }}
                returnKeyType="next"
              />
            </FormItem>
            <FormItem label="Nueva contraseña" error={errors.newPassword}>
              <Input.Password
                name="newPassword"
                accessibilityLabel="nueva contraseña"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
                onValueChange={(newValue) =>
                  setFieldError('newPassword', newValue)
                }
                returnKeyType="send"
                textContentType="newPassword"
              />
            </FormItem>
            <Button
              title="Cambiar contraseña"
              onPress={() => formRef.current?.submitForm()}
              testID="change-password-button"
              type={isSubmitted ? 'secondary' : 'primary'}
            />
          </Form>
        </View>
        {!isSubmitted ? null : <Loading />}
      </ScrollView>
    </View>
  )
}

export default ChangePassword
