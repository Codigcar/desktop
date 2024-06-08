import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'

import FormInput from '../../../../components/form/FormInput'
import { ScrollView, View } from '../../../../components/box'
import { MenuHeaderV2 } from '../../../../containers'
import { HeaderAvatar } from '../components'
import DropdownComponent from '../../../../components/input/dropdown'
import Button from '../../../../components/button'
import { ProfileStackScreenProps } from '../../../../routes/types'

const schema = Yup.object()
  .shape({
    email: Yup.string().required('Debe ingresar todos los campos'),
    phone: Yup.string().required('Debe ingresar todos los campos'),
    street: Yup.string().required('Debe ingresar todos los campos'),
  })
  .required()

const MyProfileEditScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const navigation:any = useNavigation()

  const onSubmit = () => {
    // navigation.replace("MyProfileScreen")
    navigation.replace('ProfileStackScreen', {
      screen: 'MyProfileScreen',
    })
  }

  return (
    <ScrollView flex={1} bg="white">
      <MenuHeaderV2 />

      <View px="1" flex={1}>
        <View height={20} />

        <HeaderAvatar />

        <View height={25} />

        <FormInput
          control={control}
          name="email"
          placeholder="Correo pesonal"
          errors={errors}
        />
        <View height={15} />
        <FormInput
          control={control}
          name="phone"
          placeholder="Celular"
          errors={errors}
        />
        <View height={15} />

        <DropdownComponent />
        <View height={15} />
        <DropdownComponent />
        <View height={15} />
        <DropdownComponent />
        <View height={15} />

        <FormInput
          control={control}
          name="street"
          placeholder="Calle / Av / Jirón / Nro"
          errors={errors}
        />

        <View height={60} />

        <View pb="2">
          <Button
            disabled={!isValid}
            type={isValid ? 'primary' : 'disabled'}
            title="Continuar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default MyProfileEditScreen
