import { useRoute } from '@react-navigation/native'

import { Form } from '@unform/mobile'
import React from 'react'

import { Platform } from 'react-native'
import CommonMessageError from './common/CommonMessageError'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Ribbon from '../../components/ribbon'
import { useAuthLinkAccount } from '../../hooks/useAuthLinkAccount'
import type { AuthStackScreenProps } from '../../routes/types'

const { View, SafeAreaView, ScrollView, KeyboardAvoidingView } = Box

const AccountLinkingScreen: React.FC = () => {
  const { params } = useRoute<AuthStackScreenProps<'AccountLinking'>['route']>()

  const { isSubmitted, errors, formRef, linkingAccount, setFieldError } =
    useAuthLinkAccount(params)

  return (
    <SafeAreaView bg="background.2" flex={1} edges={['bottom']}>
      <Ribbon loading={isSubmitted} title="Vincular cuentas" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={undefined}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        flex={1}>
        <ScrollView>
          {errors.common_error ? (
            <View mt="1.5" mb="2">
              <CommonMessageError error={errors.common_error} />
            </View>
          ) : null}

          <View px="1.5" my="1.5" flex={1}>
            <Form ref={formRef} onSubmit={linkingAccount}>
              <FormItem label="E-mail" error={errors.email}>
                <Input
                  defaultValue={params.email}
                  name="email"
                  type="email"
                  autoCapitalize="none"
                  autoFocus
                  onValueChange={(newValue) => setFieldError('email', newValue)}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    formRef.current?.getFieldRef('password').focus()
                  }}
                  accessibilityLabel="email"
                />
              </FormItem>
              <FormItem label="Contraseña" error={errors.password}>
                <Input.Password
                  name="password"
                  autoCapitalize="none"
                  onValueChange={(newValue) =>
                    setFieldError('password', newValue)
                  }
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm()
                  }}
                  accessibilityLabel="contraseña"
                />
              </FormItem>
              <View mt="4">
                <Button
                  disabled={isSubmitted}
                  title="Ingresar"
                  size="small"
                  type="secondary"
                  onPress={() => formRef.current?.submitForm()}
                />
              </View>
            </Form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AccountLinkingScreen
