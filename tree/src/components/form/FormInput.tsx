import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import CustomInput, { ICustomInput } from '../input/Input'
import InputOTP2 from '../input/InputOTP2'
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
        type == 'otp' ? (
          <InputOTP2
            refInput={refInput}
            onBlur={onBlur}
            onChangeText={(text: string) => {
              onChange(text)
              if (text.length === 1) {
                nextInputRef?.()
              }
            }}
            value={value}
            name={name}
          />
        ) : (
          <CustomInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            name={name}
            {...rest}
          />
        )
      }
      name={name}
    />
  )
}

export default FormInput
