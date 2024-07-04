import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import CustomInput, { ICustomInput } from '../input/Input'
import { TextInput } from 'react-native'

type IFormInput = {
  control: any
  rules?:
    | Omit<
        RegisterOptions<FieldValues, 'firstName'>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  name: string
  type?: 'default' | 'otp'
  nextInputRef?: () => void
  refInput?: React.RefObject<TextInput>
}

const FormInput = ({
  control,
  rules,
  name,
  type = 'default',
  refInput,
  nextInputRef,
  ...rest
}: IFormInput & Omit<ICustomInput, 'onChange' | 'onBlur' | 'value'>) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) =>
       (
          <CustomInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            name={name}
            {...rest}
          />
        )
      }
      name={name as any}
    />
  )
}

export default FormInput
