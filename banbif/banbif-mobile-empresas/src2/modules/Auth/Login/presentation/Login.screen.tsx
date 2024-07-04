import { useNavigation } from '@react-navigation/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { View } from '../../../../components/box'
import { AppStackScreenProps } from '../../../../routes/types'
import FormInput from '../../../../components/form/FormInput'
import Button from '../../../../components/button'

type IForm = {
  ruc: string
}

const schema = Yup.object<IForm>()
  .shape({
    ruc: Yup.string().required('Este campo es obligatorio'),
  })
  .required()

const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<AppStackScreenProps<'LoginScreen'>['navigation']>()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = (form: IForm) => {
    console.log('🚀 ------------------------------------------------------🚀')
    console.log('🚀 ~ file: Login.screen.tsx:39 ~ onSubmit ~ form:', form)
    console.log('🚀 ------------------------------------------------------🚀')
    navigation.push('OnboardingStep1Screen')
  }

  return (
    <View bg="secondary" flex={1} px="1">
      <View height={20} />
      <FormInput
        control={control}
        name="ruc"
        placeholder="RUC"
        errors={errors}
      />
      <View height={20} />
      <Button
        disabled={!isValid}
        title="Ingresa"
        onPress={handleSubmit(onSubmit)}
        type="primary"
      />
    </View>
  )
}

export default LoginScreen
