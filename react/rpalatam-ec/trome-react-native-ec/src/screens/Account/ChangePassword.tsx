import { Form } from '@unform/mobile'
import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Ribbon from '../../components/ribbon'
import { useAuthChangePassword } from '../../hooks/useAuthChangePassword'

const { ScrollView, View } = Box

const ChangePassword: React.FC = () => {
  const { errors, formRef, isSubmitted, changePassword, setFieldError } =
    useAuthChangePassword()

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
          <Form ref={formRef} onSubmit={changePassword}>
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
