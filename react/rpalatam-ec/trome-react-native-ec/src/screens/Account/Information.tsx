import { Form } from '@unform/mobile'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BackHandler, Platform } from 'react-native'

import ConfirmPassword from './ConfirmPassword'
import Loading from './Loading'
import { OPTIONS, ProfileSchema } from './utils'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input, { DateInput, SelectInput } from '../../components/input'
import Ribbon from '../../components/ribbon'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import { useAuth } from '../../context/auth'
import { useAuthInformation } from '../../hooks/useAuthInformation'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box
const today = new Date()

const Information: React.FC = () => {
  const passwordModalRef = useRef<BottomSheetCustomModal>(null)
  const { user } = useAuth()
  const {
    errors,
    formRef,
    isSubmitted,
    setFieldError,
    setIsSubmitted,
    updateInformation,
  } = useAuthInformation(ProfileSchema)

  const [documentType, setDocumentType] = useState(
    () => user.user_metadata?.documentType,
  )

  const birthday = useMemo(() => {
    return user?.date_of_birth ? new Date(user.date_of_birth) : undefined
  }, [user?.date_of_birth])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isSubmitted,
    )
    return () => backHandler.remove()
  }, [isSubmitted])

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1}>
        <Ribbon title="Mi información" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          flex={1}>
          <ScrollView flex={1}>
            <View px="0.75" pt="1" pb="1.5">
              <Form ref={formRef} onSubmit={updateInformation}>
                <FormItem label="Nombre(s)" error={errors.first_name}>
                  <Input
                    testID="input-first_name"
                    name="first_name"
                    type="text"
                    returnKeyType="next"
                    defaultValue={user.first_name}
                    onValueChange={(value) =>
                      setFieldError('first_name', value)
                    }
                    onSubmitEditing={() => {
                      formRef.current?.getFieldRef('last_name').focus()
                    }}
                  />
                </FormItem>
                <FormItem label="Apellido Paterno" error={errors.last_name}>
                  <Input
                    testID="input-last_name"
                    name="last_name"
                    defaultValue={user.last_name}
                    type="text"
                    returnKeyType="next"
                    onValueChange={(value) => setFieldError('last_name', value)}
                    onSubmitEditing={() => {
                      formRef.current?.getFieldRef('second_last_name').focus()
                    }}
                  />
                </FormItem>
                <FormItem
                  label="Apellido Materno"
                  error={errors.second_last_name}>
                  <Input
                    testID="input-second_last_name"
                    defaultValue={user.second_last_name}
                    name="second_last_name"
                    type="text"
                    returnKeyType="next"
                    onValueChange={(value) => {
                      setFieldError('second_last_name', value)
                    }}
                  />
                </FormItem>
                <FormItem label="Correo electrónico" error={errors.email}>
                  <Input
                    testID="input-email"
                    name="email"
                    type="email"
                    disabled={!!user.email}
                    defaultValue={user.email}
                    returnKeyType="next"
                    onValueChange={(value) => setFieldError('email', value)}
                  />
                </FormItem>
                <FormItem label="Tipo de documento">
                  <SelectInput
                    name="user_metadata.documentType"
                    defaultValue={user.user_metadata?.documentType}
                    options={OPTIONS.document}
                    onValueChange={(value) => {
                      setDocumentType(value)
                    }}
                    placeholder="Seleccionar"
                  />
                </FormItem>
                <FormItem
                  label="Número de documento"
                  error={errors['user_metadata.documentNumber']}>
                  <Input
                    testID="user_metadata.documentNumber"
                    name="user_metadata.documentNumber"
                    disabled={!documentType}
                    defaultValue={user.user_metadata?.documentNumber}
                    type="phone"
                    keyboardType={
                      documentType === 'DNI' ? 'numeric' : 'default'
                    }
                    returnKeyType="next"
                    onValueChange={(value) => {
                      setFieldError('user_metadata.documentNumber', value)
                    }}
                  />
                </FormItem>
                <FormItem label="Estado civil">
                  <SelectInput
                    name="user_metadata.civilStatus"
                    options={OPTIONS.civilStatus}
                    defaultValue={user.user_metadata?.civilStatus}
                    placeholder="Seleccionar"
                  />
                </FormItem>
                <FormItem
                  label="Fecha de nacimiento"
                  error={errors.date_of_birth}>
                  <DateInput
                    name="date_of_birth"
                    defaultDate={birthday}
                    maximumDate={today}
                  />
                </FormItem>
                <FormItem label="Género">
                  <SelectInput
                    name="gender"
                    options={OPTIONS.gender}
                    defaultValue={user.gender?.toUpperCase()}
                    placeholder="Seleccionar"
                  />
                </FormItem>
                <FormItem label="Número de celular" error={errors.mobile_phone}>
                  <Input
                    testID="input-mobile_phone"
                    name="mobile_phone"
                    defaultValue={user.mobile_phone}
                    type="phone"
                    keyboardType="numeric"
                    onValueChange={(value) => {
                      setFieldError('mobile_phone', value)
                    }}
                  />
                </FormItem>
                <Button
                  onPress={() => formRef.current?.submitForm()}
                  title="Actualizar"
                  type="primary"
                />
              </Form>
            </View>
            <SafeAreaView edges={['bottom']} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <BottomSheetCustomModal
        ref={passwordModalRef}
        snapPoints={[500]}
        enableContentPanningGesture={false}>
        <ConfirmPassword
          setIsSubmitted={setIsSubmitted}
          onSubmit={() => {
            passwordModalRef.current?.close()
            formRef.current?.submitForm()
          }}
        />
      </BottomSheetCustomModal>
      {!isSubmitted ? null : <Loading />}
    </BottomSheetModalProvider>
  )
}

export default Information
