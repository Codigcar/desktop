/* eslint-disable @typescript-eslint/no-explicit-any */
// Based in Yup https://github.com/jquense/yup

interface Arguments {
  custom: [fn: (value: any, options: Options) => void]
  email: [message?: string]
  matches: [regex: RegExp, message?: string]
  max: [max: number, message?: string]
  min: [min: number, message?: string]
  required: [message?: string]
}

type ValidatorKeys = keyof Arguments
type ValidatorValues = Arguments[ValidatorKeys]

interface Options {
  context?: Record<string, any>
}

type Validator = {
  [Key in keyof Arguments]: (
    value: any,
    options: Options,
    ...args: Arguments[Key]
  ) => void
}

const validations: Validator = {
  custom: (value, options, fn) => fn(value, options),
  email: (value, _, message) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value || '')) {
      throw new Error(message || 'Email inválido')
    }
  },
  matches: (value, _, regex, message) => {
    if (value?.match(regex)) throw new Error(message || 'Formato inválido')
  },
  max: (value, _, max, message) => {
    if (value && value.length > max) {
      throw new Error(message || `Máximo ${max} caracteres`)
    }
  },
  min: (value, _, min, message) => {
    if (value && value.length < min) {
      throw new Error(message || `Mínimo ${min} caracteres`)
    }
  },
  required: (value, _, message) => {
    if (!value) throw new Error(message || 'Campo requerido')
  },
}

export class ValidationError extends Error {
  inner: Record<string, string> = {}

  constructor(errors: string[][]) {
    super()

    this.name = 'ValidationError'
    this.message =
      errors.length > 1 ? `${errors.length} errores encontrados` : errors[0][1]

    errors.forEach(([field, message]) => {
      this.inner[field] = message
    })

    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError)
  }
}

class Schema {
  private rules: [ValidatorKeys, ValidatorValues][] = []

  protected setRule(...args: [ValidatorKeys, ValidatorValues]) {
    this.rules.push(args)
  }

  clone() {
    const instance: this = this.constructor()
    instance.rules = [...this.rules]
    return instance
  }

  required(...args: Arguments['required']) {
    this.setRule('required', args)
    return this
  }

  async validate(value: any, options: Options = {}): Promise<true> {
    return this.validateSync(value, options)
  }

  validateSync(value: any, options: Options = {}): true {
    let error
    let i = 0
    while (i < this.rules.length) {
      try {
        const [rule, params] = this.rules[i]
        const _rule: any = validations[rule]
        _rule(value, options, ...params)
      } catch (err: any) {
        error = err.message
        break
      }
      i++
    }
    if (error) throw new Error(error)
    return true
  }

  when(key: string, builder: (value: any, schema: this) => this) {
    const when = (value: any, options: Options) => {
      const keyValue = options.context?.[key]
      const build = builder(keyValue, this.constructor())
      build.validateSync(value)
    }
    this.setRule('custom', [when])
    return this
  }
}

class ArraySchema extends Schema {
  constructor() {
    super()
    const init = (value: any) => {
      if (value === undefined || Array.isArray(value)) return
      throw new Error('Tipo inválido')
    }
    this.init(init)
  }

  private init(...args: Arguments['custom']) {
    this.setRule('custom', args)
    return this
  }
}

class BooleanSchema extends Schema {
  constructor() {
    super()
    const init = (value: any) => {
      if (value === undefined || typeof value === 'boolean') return
      throw new Error('Tipo inválido')
    }
    this.init(init)
  }

  private init(...args: Arguments['custom']) {
    this.setRule('custom', args)
    return this
  }
}

class StringSchema extends Schema {
  constructor() {
    super()
    const init = (value: any) => {
      if (value === undefined || typeof value === 'string') return
      throw new Error('Tipo inválido')
    }
    this.init(init)
  }

  private init(...args: Arguments['custom']) {
    this.setRule('custom', args)
    return this
  }

  email(...args: Arguments['email']) {
    this.setRule('email', args)
    return this
  }

  matches(...args: Arguments['matches']) {
    this.setRule('matches', args)
    return this
  }

  max(...args: Arguments['max']) {
    this.setRule('max', args)
    return this
  }

  min(...args: Arguments['min']) {
    this.setRule('min', args)
    return this
  }
}

function flattenObject<T>(obj: Record<string, any>, path?: string) {
  const flattened: Record<string, T> = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const constructor = value?.constructor.toString()
    if (/function\sobject/i.test(constructor)) {
      Object.assign(flattened, flattenObject(value, key))
    } else if (Array.isArray(value)) {
      value.forEach((val, index) => {
        Object.assign(flattened, flattenObject(val, `${key}[${index}]`))
      })
    } else {
      const name = path ? `${path}.${key}` : key
      flattened[name] = value
    }
  })

  return flattened
}

type FieldSchema = ArraySchema | BooleanSchema | StringSchema
type ObjectValue<T> = T | Record<string, T> | Record<string, T>[]
type ObjectFields = Record<string, ObjectValue<FieldSchema>>

class ObjectSchema {
  private fields: Record<string, FieldSchema> = {}

  constructor(fields?: ObjectFields) {
    if (fields) this.fields = flattenObject<FieldSchema>(fields)
  }

  clearField(field: string) {
    delete this.fields[field]
  }

  setField(field: string, schema: FieldSchema) {
    this.fields[field] = schema
  }

  shape(fields: ObjectFields) {
    return new ObjectSchema(Object.assign({}, this.fields, fields))
  }

  async validate(value: Record<string, ObjectValue<any>>): Promise<true> {
    return this.validateSync(value)
  }

  validateSync(value: Record<string, ObjectValue<any>>): true {
    const fields = Object.keys(this.fields)
    const flattenedData = flattenObject<any>(value)
    const errors: string[][] = []

    fields.forEach((field) => {
      try {
        const instance = this.fields[field]
        instance.validateSync(flattenedData[field], {
          context: flattenedData,
        })
      } catch (error: any) {
        errors.push([field, error.message])
      }
    })

    if (errors.length > 0) throw new ValidationError(errors)
    return true
  }
}

export const array = (): ArraySchema => new ArraySchema()
export const boolean = (): BooleanSchema => new BooleanSchema()
export const object = (fields?: ObjectFields): ObjectSchema =>
  new ObjectSchema(fields)
export const string = (): StringSchema => new StringSchema()
