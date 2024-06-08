import { Form } from '@unform/mobile'
import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Ribbon from '../../components/ribbon'
import { useAuthChangePassword } from '../../hooks/useAuthChangePassword'

const { ScrollView, View } = Box
const style = { flexGrow: 1 }

const ChangePassword: React.FC = () => {
  const { errors, formRef, isSubmitted, changePassword, setFieldError } =
    useAuthChangePassword()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isSubmitted,
    )
    return () => backHandler.remove()
  }, [isSubmitted])

  return (
    <View bg="background.3" flex={1}>
      <Ribbon loading={isSubmitted} title="Cambiar contraseña" />
      <ScrollView contentContainerStyle={style}>
        <View px="1.5" pt="1" pb="1.5">
          <Form ref={formRef} onSubmit={changePassword}>
            <FormItem label="Actual contraseña" error={errors.oldPassword}>
              <Input.Password
                name="oldPassword"
                accessibilityLabel="actual contraseña"
                autoCapitalize="none"
                autoFocus
                disabled={isSubmitted}
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
                disabled={isSubmitted}
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
            <View mt="1">
              <Button
                disabled={isSubmitted}
                onPress={() => formRef.current?.submitForm()}
                testID="change-password-button"
                title="Cambiar contraseña"
                type="secondary"
                size="small"
              />
            </View>
          </Form>
        </View>
      </ScrollView>
    </View>
  )
}

export default ChangePassword
