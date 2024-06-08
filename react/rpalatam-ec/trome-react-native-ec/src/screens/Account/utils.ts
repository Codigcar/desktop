import { App } from '../../utils/config'
import * as Schema from '../../utils/validation'

const name = Schema.string()
  .matches(/\d+/i, 'Este campo no puede contener números')
  .matches(/\D{51,}/i, 'Máximo 50 caracteres')

export const ProfileSchema = Schema.object({
  first_name: App.select({
    elcomercio: name.clone().min(2).required(),
    default: name.clone().required(),
  }),
  last_name: name.clone().min(2).required(),
  second_last_name: name.clone().min(2),
  email: Schema.string().required().email(),
  mobile_phone: App.select({
    elcomercio: Schema.string()
      .matches(/\D+/i, 'Se aceptan solo números')
      .min(6, 'Mínimo 6 dígitos')
      .max(12, 'Máximo 12 dígitos'),
    default: Schema.string()
      .min(9, 'Mínimo 9 dígitos')
      .max(13, 'Máximo 13 dígitos'),
  }),
  user_metadata: {
    documentNumber: App.select({
      elcomercio: Schema.string().required(),
      default: Schema.string(),
    })
      .matches(/\s+/i, 'No se permiten espacios en blanco')
      .when('user_metadata.documentType', (value, schema) => {
        if (value === undefined) return schema
        if (value === 'DNI') {
          return schema
            .required()
            .matches(/\D+/i, 'Se aceptan solo números')
            .min(8, 'Se aceptan 8 dígitos')
            .max(8, 'Se aceptan 8 dígitos')
        }
        return schema
          .required()
          .min(9, 'Mínimo 9 dígitos')
          .max(20, 'Máximo 20 dígitos')
      }),
    documentType: Schema.string(),
  },
})
const gendersBase = [
  { label: 'Hombre', value: 'MALE' },
  { label: 'Mujer', value: 'FEMALE' },
]
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
  gender: App.select({
    elcomercio: [
      ...gendersBase,
      { label: 'Prefiero no decirlo', value: 'UNKNOWN' },
      { label: 'Otro', value: 'OTHER' },
    ],
    default: gendersBase,
  }),
}
