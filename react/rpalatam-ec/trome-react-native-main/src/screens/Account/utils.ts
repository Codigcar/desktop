import * as Schema from '../../utils/validation'

export const ProfileSchema = Schema.object().shape({
  first_name: Schema.string()
    .matches(/\d+/i, 'Este campo no puede contener números')
    .matches(/\D{51,}/i, 'Máximo 50 caracteres')
    .required(),
  last_name: Schema.string()
    .matches(/\d+/i, 'Este campo no puede contener números')
    .min(2)
    .matches(/\D{51,}/, 'Máximo 50 caracteres')
    .required(),
  second_last_name: Schema.string()
    .matches(/\d+/i, 'Este campo no puede contener números')
    .min(2)
    .matches(/\D{51,}/, 'Máximo 50 caracteres'),
  email: Schema.string().email(),
  mobile_phone: Schema.string()
    .min(9, 'Mínimo 9 dígitos')
    .matches(/\d{13,}/i, 'Máximo 13 dígitos'),
  address: {},
  user_metadata: {},
})

export const OPTIONS = {
  country: [{ label: 'Perú', value: '260000' }],
  civilStatus: [
    { label: 'Soltero (a)', value: 'SO' },
    { label: 'Casado (a)', value: 'CA' },
    { label: 'Divorciado (a)', value: 'DI' },
    { label: 'Viudo (a)', value: 'VI' },
  ],
  document: [
    { label: 'DNI', value: 'DNI' },
    { label: 'CEX', value: 'CEX' },
    { label: 'CDI', value: 'CDI' },
  ],
  gender: [
    { label: 'Hombre', value: 'MALE' },
    { label: 'Mujer', value: 'FEMALE' },
  ],
}
