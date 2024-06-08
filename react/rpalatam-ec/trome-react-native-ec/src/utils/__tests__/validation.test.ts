import { array, boolean, object, string } from '../../utils/validation'

describe('Validation tool', () => {
  describe('base schema', () => {
    it('clone method', () => {
      const schema = string()
      const email = schema.clone().email()
      expect(schema.validateSync('hello')).toBeTruthy()
      expect(() => email.validateSync('hello')).toThrow()
    })

    it('validate method', async () => {
      const schema = string()
      await expect(schema.validate('hello')).resolves.toBeTruthy()
      await expect(schema.validate(null)).rejects.toThrow()
    })

    it('validateSync method', () => {
      const schema = string()
      expect(schema.validateSync('hello')).toBeTruthy()
      expect(() => schema.validateSync(null)).toThrow()
    })

    it('required rule', () => {
      const schema = string().required()
      const message = /campo\srequerido/i
      expect(() => schema.validateSync(undefined)).toThrow(message)
      expect(schema.validateSync('hello')).toBeTruthy()
    })

    it('required rule with custom message', () => {
      const message = 'campo obligatorio'
      const schema = string().required(message)
      expect(() => schema.validateSync(undefined)).toThrow(message)
      expect(schema.validateSync('hello')).toBeTruthy()
    })

    it('when rule', () => {
      const schema = object({
        doctype: string().required(),
        docnumber: string()
          .required()
          .when('doctype', (value, scheme) => {
            return value === 'dni' ? scheme.min(8) : scheme.min(5)
          }),
      })
      const dni = { doctype: 'dni', docnumber: '1234567' }
      expect(() => schema.validateSync(dni)).toThrow(/mínimo\s8/i)
      const cdi = { doctype: 'cdi', docnumber: '1234' }
      expect(() => schema.validateSync(cdi)).toThrow(/mínimo\s5/i)
    })
  })

  describe('array', () => {
    it('should be valid', () => {
      const schema = array()
      expect(schema.validateSync(undefined)).toBeTruthy()
      expect(schema.validateSync([])).toBeTruthy()
    })

    it('should be invalid', () => {
      const schema = array()
      expect(() => schema.validateSync('hello')).toThrow()
      expect(() => schema.validateSync(null)).toThrow()
      expect(() => schema.validateSync(true)).toThrow()
      expect(() => schema.validateSync({})).toThrow()
    })
  })

  describe('boolean', () => {
    it('should be valid', () => {
      const schema = boolean()
      expect(schema.validateSync(undefined)).toBeTruthy()
      expect(schema.validateSync(false)).toBeTruthy()
      expect(schema.validateSync(true)).toBeTruthy()
    })

    it('should be invalid', () => {
      const schema = boolean()
      expect(() => schema.validateSync('hello')).toThrow()
      expect(() => schema.validateSync(null)).toThrow()
      expect(() => schema.validateSync([])).toThrow()
      expect(() => schema.validateSync({})).toThrow()
    })
  })

  describe('object', () => {
    it('should set field dynamically', async () => {
      const schema = object({ email: string() })
      const data = { email: 'ec@ec.pe' }
      await expect(schema.validate(data)).resolves.toBeTruthy()
      schema.setField('password', string().required())
      await expect(schema.validate(data)).rejects.toThrow()
    })

    it('should clear field dynamically', async () => {
      const schema = object({ name: string(), lastname: string() })
      const data = { name: 'name', lastname: null }
      await expect(schema.validate(data)).rejects.toThrow()
      schema.clearField('lastname')
      await expect(schema.validate(data)).resolves.toBeTruthy()
    })

    it('should validate array in object', async () => {
      const schema = object({ phones: [{ home: string().required() }] })
      await expect(schema.validate({})).rejects.toThrow()
      await expect(schema.validate({ phones: [] })).rejects.toThrow()
      const data = { phones: [{ home: '123' }] }
      await expect(schema.validate(data)).resolves.toBeTruthy()
    })

    it('should validate nested objects', async () => {
      const schema = object({ address: { country: string().required() } })
      await expect(schema.validate({ address: {} })).rejects.toThrow()
      const data = { address: { country: 'PE' } }
      await expect(schema.validate(data)).resolves.toBeTruthy()
    })

    it('should validate multiple fields', async () => {
      const schema = object({
        name: string().required(),
        lastname: string().required(),
      })
      const message = /2\serrores\sencontrados/i
      await expect(schema.validate({})).rejects.toThrow(message)
    })

    it('should create a new object schema based on another', async () => {
      const base = object({ a: string(), b: boolean() })
      const schema = base.shape({ b: string(), c: string() })
      const data = { a: 'a', b: 'b', c: 'c' }
      await expect(base.validate(data)).rejects.toThrow()
      await expect(schema.validate(data)).resolves.toBeTruthy()
    })
  })

  describe('string', () => {
    it('should be valid', () => {
      const schema = string()
      expect(schema.validateSync(undefined)).toBeTruthy()
      expect(schema.validateSync('hello')).toBeTruthy()
    })

    it('should be invalid', () => {
      const schema = string()
      expect(() => schema.validateSync(true)).toThrow()
      expect(() => schema.validateSync(null)).toThrow()
      expect(() => schema.validateSync([])).toThrow()
      expect(() => schema.validateSync({})).toThrow()
    })

    it('email rule', () => {
      const schema = string().email()
      const message = /email\sinválido/i
      expect(() => schema.validateSync('ec.pe')).toThrow(message)
      expect(schema.validateSync('ec@ec.pe')).toBeTruthy()
    })

    it('email rule with custom message', () => {
      const message = 'formato inválido'
      const schema = string().email(message)
      expect(() => schema.validateSync('ec.pe')).toThrow(message)
      expect(schema.validateSync('ec@ec.pe')).toBeTruthy()
    })

    it('matches rule', () => {
      const message = /formato\sinválido/i
      const schema = string().matches(/\d/)
      expect(() => schema.validateSync('1')).toThrow(message)
      expect(schema.validateSync('uno')).toBeTruthy()
    })

    it('matches rule with custom message', () => {
      const message = 'No se permiten números'
      const schema = string().matches(/\d/, message)
      expect(() => schema.validateSync('1')).toThrow(message)
      expect(schema.validateSync('uno')).toBeTruthy()
    })

    it('max rule', () => {
      const message = /máximo\s3\scaracteres/i
      const schema = string().max(3)
      expect(() => schema.validateSync('abcd')).toThrow(message)
      expect(schema.validateSync('abc')).toBeTruthy()
    })

    it('max rule with custom message', () => {
      const message = 'No más de 3 caracteres'
      const schema = string().max(3, message)
      expect(() => schema.validateSync('abcd')).toThrow(message)
      expect(schema.validateSync('abc')).toBeTruthy()
    })

    it('min rule', () => {
      const message = /mínimo\s2\scaracteres/i
      const schema = string().min(2)
      expect(() => schema.validateSync('a')).toThrow(message)
      expect(schema.validateSync('ab')).toBeTruthy()
    })

    it('min rule with custom message', async () => {
      const message = 'No menos de 2 caracteres'
      const schema = string().min(2, message)
      expect(() => schema.validateSync('a')).toThrow(message)
      expect(schema.validateSync('ab')).toBeTruthy()
    })
  })
})
