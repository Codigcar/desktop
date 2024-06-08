import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'

import View from '../../../../components/box/View'
import { Paragraph } from '../../../../components/typhografic'
import { ProfileStackScreenProps } from '../../../../routes/types'
import FormInput from '../../../../components/form/FormInput'
import { TouchableOpacity } from 'react-native'
import { IconEyesPassword } from '../../../../assets/icons'
import Button from '../../../../components/button'
import ScrollView from '../../../../components/box/ScrollView'
import { Header, RowValidator } from '../../../Auth/presentation/components'
import { useAuth } from '../../../../context/auth.provider'
import useChangePasswordInteractor from '../../../Auth/presentation/screens/changePassword/ChangePassword.interactor'
import Loading from '../../../../components/loading'

const rgxMinyMax = /^.{8,20}$/
const rgxNumero = /[0-9]/
const rgxLetraMayuscula = /[A-Z]/
const rgxCaracterEspecial = /[!@#$%^&*]/

type IForm = {
  password1: string
  password2: string
}

const schema = Yup.object<IForm>()
  .shape({
    password1: Yup.string().required('Este campo es obligatorio'),
    password2: Yup.string().required('Este campo es obligatorio'),
  })
  .required()

const ChangePasswordScreen2 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  // const navigation =
  //   useNavigation<
  //     ProfileStackScreenProps<'ChangePasswordScreen2'>['navigation']
  //   >()
   const navigation:any = useNavigation()
  const { params } =
    useRoute<ProfileStackScreenProps<'ChangePasswordScreen2'>['route']>()
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false)
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false)
  const { signOut } = useAuth()
  const { fetchChangePassword, isLoading } = useChangePasswordInteractor()

  const validatorsList = [
    {
      condition:
        rgxMinyMax.test(watch('password1')) &&
        typeof watch('password1') !== 'undefined',
      description: 'Mínimo entre 8 y 20 caracteres máximos',
    },
    {
      condition: rgxNumero.test(watch('password1')),
      description: 'Contener 1 número',
    },
    {
      condition: rgxLetraMayuscula.test(watch('password1')),
      description: '1 Letra mayúscula',
    },
    {
      condition: rgxCaracterEspecial.test(watch('password1')),
      description: '1 Caracter especial',
    },
    {
      condition:
        rgxMinyMax.test(watch('password1')) &&
        String(watch('password1')).length > 0 &&
        typeof watch('password1') !== 'undefined',
      description: 'Ambas claves coincide',
    },
  ]

  const onSubmit = async (data: IForm) => {
    const { status } = await fetchChangePassword({
      username: params.username,
      actualPassword: params.currentPassword,
      password: data.password1,
      passwordConfirmation: data.password2,
    })

    if (!status) return

    Toast.show({
      type: 'success',
      text1: 'Clave modificada',
      text2: 'Inicie sesión con su nueva clave',
    })
    signOut()
    navigation.replace('AuthStackScreen', {screen: 'LoginScreen'})
  }

  return (
    <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }} bg="white">
      <View paddingHorizontal="1" bg="white" flex={1}>
        <Header onPressIconClose={navigation.goBack} />
        <View height={15} />
        <Paragraph fontWeight="600" color="black" fontSize={20}>
          Ingresa tu nueva clave
        </Paragraph>
        <Paragraph>
          Recuerda que debes ingresar una clave que no hayas utilizado antes
        </Paragraph>
        <View height={30} />
        <FormInput
          control={control}
          name="password1"
          placeholder="Clave de acceso"
          errors={errors}
          isPassword={isVisiblePassword1}
          SuffixComponent={() => (
            <TouchableOpacity
              onPress={() => setIsVisiblePassword1(!isVisiblePassword1)}>
              <View pt="0.5">
                <IconEyesPassword />
              </View>
            </TouchableOpacity>
          )}
        />
        <View height={20} />
        <FormInput
          control={control}
          name="password2"
          placeholder="Repetir clave de acceso"
          errors={errors}
          isPassword={isVisiblePassword2}
          SuffixComponent={() => (
            <TouchableOpacity
              onPress={() => setIsVisiblePassword2(!isVisiblePassword2)}>
              <View pt="0.5">
                <IconEyesPassword />
              </View>
            </TouchableOpacity>
          )}
        />
        <View height={20} />

        <View pl="1">
          <Paragraph color="black">Tu clave debe contener:</Paragraph>
          {validatorsList.map((item) => (
            <RowValidator
              key={item.description}
              condition={item.condition}
              description={item.description}
            />
          ))}
        </View>

        <View flex={1} />

        <View pb="2">
          <Button
            disabled={!isValid}
            type={isValid ? 'primary' : 'disabled'}
            title="Continuar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      {
        isLoading ? <Loading /> : null
      }
    </ScrollView>
  )
}

export default ChangePasswordScreen2
