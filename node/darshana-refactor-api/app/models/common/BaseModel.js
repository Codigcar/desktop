const mysqlm = require('mysqlm')

class RawValue {
  constructor(_value) {
    this.val = _value
  }
  getValue() {
    return this.val
  }
}

class baseChain {
  constructor(parent) {
    this.escapeId = parent.escapeId
    this.escape = parent.escape
    this.onQuery = parent.onQuery
    this.db = parent.db

    this.type = parent.type

    this.string_fields = parent.string_fields
    this.pre_string_fields = parent.pre_string_fields
    this.post_string_fields = parent.post_string_fields

    this.query = parent.query
    this.condition = parent.condition
    this.order = parent.order
    this.limits = parent.limits

    this.overwrite = parent.overwrite
  }
  getQuery() {
    return (
      [
        this.type,
        this.pre_string_fields,
        this.string_fields,
        this.post_string_fields,
        this.query,
        this.condition,
        this.order,
        this.limits,
      ]
        .map((v) => (v ? v.trim() : ''))
        .join(' ') + ''
    ).trim()
  }
  async all(options = { useOverwrite: true }) {
    let _query = this.getQuery()

    this.onQuery(_query)

    if (this.overwrite) {
      if (this.overwrite.all) {
        if (options.useOverwrite) {
          return await Promise.resolve(
            this.overwrite.all(await Promise.resolve(this.db.query(_query))),
          )
        }
      }
    }
    return await Promise.resolve(this.db.query(_query))
  }
  async one(options = { useOverwrite: true }) {
    let _query = this.getQuery()

    this.onQuery(_query)

    if (this.overwrite) {
      if (this.overwrite.one) {
        if (options.useOverwrite) {
          return await Promise.resolve(
            this.overwrite.one(await Promise.resolve(this.db.queryOne(_query))),
          )
        }
      }
    }
    return await Promise.resolve(this.db.queryOne(_query))
  }
}

class limitChain extends baseChain {
  constructor(parent) {
    super(parent)
  }
  limit(_limit, _offset) {
    _limit = parseInt(_limit)
    _offset = parseInt(_offset)

    this.limits += ` LIMIT ${escape(_limit)}`

    if (isNaN(_limit)) _limit = null
    if (isNaN(_offset)) _offset = null

    if (_offset !== null && _offset !== undefined)
      this.limits += ` OFFSET ${escape(_offset)}`

    return new baseChain(this)
  }
}
class findChain extends limitChain {
  orderBy(field, tableName, _order = 'ASC' || 'DESC') {
    _order = _order.toUpperCase()
    if (!this.order) this.order += ` ORDER BY`
    if (Array.isArray(field)) {
      for (let i = 0; i < field?.length; i++) {
        if (!field[i].column) field[i].column = 'id'

        // usar o no el this.scapeId en caso tenga tableName prop
        if (!tableName)
          this.order += ` ${this.escapeId(field[i].column)} ${field[i].dir}`
        else this.order += ` ${tableName}.${field[i].column} ${field[i].dir}`

        i == 0 && field.length > 1 ? (this.order += ',') : ''
      }
    } else if (field) {
      let fieldArray = field.split(',')
      this.order += ` ${this.escapeId(fieldArray[0])} ${_order}`
      if (fieldArray.length > 1) {
        this.order += `, ${this.escapeId(fieldArray[1])} ${_order}`
      }
    } else {
      this.order += ` id ${_order}`
    }

    return new limitChain(this)
  }
  andOpenBrackets() {
    this.condition += ` AND (`
    return this
  }
  orOpenBrackets() {
    this.condition += ` OR (`
    return this
  }
  closeBrackets() {
    this.condition += ` )`
    return this
  }
  and(field, operand, value, type = 'withScapeId') {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` AND`

    if (type === 'withScapeId')
      this.condition += ` ${this.escapeId(field)} ${operand} ${this.escape(
        value,
      )}`
    else this.condition += ` ${field} ${operand} ${this.escape(value)}`

    return this
  }
  andOrNnull(field, operand, value) {
    if (!this.condition.endsWith('('))
      if (this.condition) this.andOpenBrackets()

    this.condition += ` ${this.escapeId(field)} ${operand} ${this.escape(
      value,
    )} OR ${this.escapeId(field)} is NULL`

    this.closeBrackets()

    return this
  }
  in(field, value) {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` AND`

    this.condition += ` ${this.escapeId(field)} IN (${this.escape(value)})`
    console.log(this)
    return this
  }
  andNull(field) {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` AND`

    this.condition += ` ${this.escapeId(field)} IS NULL`

    return this
  }
  andNotNull(field) {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` AND`

    this.condition += ` ${this.escapeId(field)} IS NOT NULL`

    return this
  }
  or(field, operand, value, type = 'withScapeId') {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` OR`

    if (type === 'withScapeId')
      this.condition += ` ${this.escapeId(field)} ${operand} ${this.escape(
        value,
      )}`
    else this.condition += ` ${field} ${operand} ${this.escape(value)}`

    return this
  }
  orWithAndAtStart(field, operand, value) {
    if (!this.condition.endsWith('('))
      this.condition.endsWith(')')
        ? (this.condition += ` AND`)
        : (this.condition += ` OR`)

    this.condition += ` ${this.escapeId(field)} ${operand} ${this.escape(
      value,
    )}`

    return this
  }
  orNull(field) {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` OR`

    this.condition += ` ${this.escapeId(field)} IS NULL`

    return this
  }
  orNotNull(field, type = 'withScapeId') {
    if (!this.condition.endsWith('('))
      if (this.condition) this.condition += ` OR`

    if (type === 'withScapeId')
      this.condition += ` ${this.escapeId(field)} IS NOT NULL`
    else this.condition += ` ${field} IS NOT NULL`

    return this
  }
}

class joinChain {
  constructor(parent) {
    this.escapeId = parent.escapeId
    this.escape = parent.escape
    this.onQuery = parent.onQuery
    this.db = parent.db

    this.type = parent.type

    this.string_fields = parent.string_fields
    this.pre_string_fields = parent.pre_string_fields
    this.post_string_fields = parent.post_string_fields

    this.query = parent.query
    this.condition = parent.condition
    this.order = parent.order
    this.limits = parent.limits
  }
  on(_field, _operand, _value) {
    // this.query += ` ON ${this.escapeId(_field)} ${_operand} ${this.escape(_value)}`;
    this.query += ` ON ${_field} ${_operand} ${_value}`
    return new selectChain(this)
  }
}

class selectChain extends baseChain {
  constructor(parent) {
    super(parent)
    this.overwrite = parent.overwrite
  }
  innerJoin(table_b) {
    this.query += ` INNER JOIN ${this.escapeId(table_b)}`
    return new joinChain(this)
  }

  leftJoin(table_b) {
    this.query += ` LEFT JOIN ${this.escapeId(table_b)}`
    return new joinChain(this)
  }

  rightJoin(table_b) {
    this.query += ` RIGHT JOIN ${this.escapeId(table_b)}`
    return new joinChain(this)
  }

  fullJoin(table_b) {
    this.query += ` FULL JOIN ${this.escapeId(table_b)}`
    return new joinChain(this)
  }

  openBrackets() {
    this.condition += ` WHERE (`
    return new findChain(this)
  }

  where(_field, _operand, _value) {
    if (arguments.length === 3)
      this.condition += ` WHERE ${this.escapeId(
        _field,
      )} ${_operand} ${this.escape(_value)} `.trim()
    return new findChain(this)
  }

  whereNotNull(_field) {
    this.condition += ` WHERE ${this.escapeId(_field)} IS NOT NULL `.trim()
    return new findChain(this)
  }

  whereNull(_field) {
    this.condition += ` WHERE ${this.escapeId(_field)} IS NULL `.trim()
    return new findChain(this)
  }

  or(_field, _operand, _value) {
    this.condition += ` WHERE ${this.escapeId(
      _field,
    )} ${_operand} ${this.escape(_value)} `.trim()
    return new findChain(this)
  }

  and(_field, _operand, _value, type = 'withScapeId') {
    // if(arguments.length === 3)
    // this.condition += ` WHERE ${this.escapeId(_field)} ${_operand} ${this.escape(_value)} `.trim();

    if (type === 'withScapeId')
      this.condition += ` WHERE ${this.escapeId(
        _field,
      )} ${_operand} ${this.escape(_value)} `.trim()
    else
      this.condition += ` WHERE ${_field} ${_operand} ${this.escape(
        _value,
      )} `.trim()

    return new findChain(this)
  }

  andNotNull(_field) {
    this.condition += ` WHERE ${this.escapeId(_field)} IS NOT NULL `.trim()
    return new findChain(this)
  }

  andNull(_field) {
    this.condition += ` WHERE ${this.escapeId(_field)} IS NULL `.trim()
    return new findChain(this)
  }

  limit(_limit, _offset) {
    _limit = parseInt(_limit)
    _offset = parseInt(_offset)

    if (isNaN(_limit)) _limit = null

    if (isNaN(_offset)) _offset = null

    this.limits += ` LIMIT ${escape(_limit)}`

    if (_offset !== null && _offset !== undefined)
      this.limits += ` OFFSET ${escape(_offset)}`

    return new baseChain(this)
  }
}

class BaseModel {
  constructor({
    table_name = '',
    fields = [],
    // primaryKey = '',
    control_fields = [],
    base_sql = '',
    connection = {},
    onQuery = (/* query */) => {},
    overwrite = null,
  }) {
    this.options = {
      table_name,
      fields,
      control_fields,
    }
    this.db = connection
    this.onQuery = onQuery
    this.table_name = table_name
    this.fields = [...control_fields, ...fields]
    this.overwrite = overwrite

    if (base_sql === '' || base_sql === null || base_sql === undefined) {
      this.base_sql = this.escapeId(table_name)
    } else {
      this.base_sql = `(SELECT * FROM ${this.escapeId(
        this.table_name,
      )}) as base`
    }
  }

  escape(v) {
    return v instanceof RawValue ? v.getValue() : mysqlm.escape(v)
  }

  escapeId(v) {
    if (v instanceof RawValue) return v.getValue()

    v = (v + '').split('.').join('{___DOT_TOKEN___}')
    v = mysqlm.escapeId(v)
    v = (v + '').split('{___DOT_TOKEN___}').join('.')

    return v
  }

  select(field = '' || []) {
    let fields = Array.isArray(field) ? field : [field]

    this.string_fields = fields.map((v) => this.escapeId(v)).join(', ')
    if (field == '*') {
      this.string_fields = '*'
    }

    this.pre_string_fields = 'SELECT'
    this.post_string_fields = 'FROM ' + this.table_name
    this.query = ''
    this.condition = ''
    this.order = ''
    this.limits = ''

    return new selectChain(this)
  }

  updateSet(fields = {}) {
    this.string_fields =
      ' ' +
      Object.keys(fields)
        .map(
          (field) => this.escapeId(field) + ' = ' + this.escape(fields[field]),
        )
        .join(', ')

    this.pre_string_fields = 'UPDATE ' + this.escapeId(this.table_name) + ' SET'
    this.post_string_fields = ''
    this.query = ''
    this.condition = ''
    this.order = ''
    this.limits = ''

    return new selectChain(this)
  }

  deleteFrom(table = '') {
    this.string_fields = ' '

    this.pre_string_fields =
      'DELETE FROM ' + this.escapeId(table ? table : this.table_name)
    this.post_string_fields = ''
    this.query = ''
    this.condition = ''
    this.order = ''
    this.limits = ''

    return new selectChain(this)
  }

  getById(id) {
    return this.getOneWhere({ equals: { id: id } })
  }

  getAll(options = { useOverwrite: true, useSoftDelete: false }) {
    if (options.useSoftDelete) {
      return this.select('*')
        .whereNull('deleted_at')
        .all({ useOverwrite: options.useOverwrite })
    }
    return this.select('*').all({ useOverwrite: options.useOverwrite })
  }

  getOneWhere(
    options = {
      equals: {},
      like: {},
      notEquals: {},
      isNull: [],
      isNotNull: [],
    },
  ) {
    options = { equals: {}, like: {}, isNull: [], isNotNull: [], ...options }
    let query = this.select('*')
    for (const field in options.equals) {
      if (this.fields.includes(field)) {
        query = query.and(field, '=', options.equals[field])
      }
    }
    for (const field in options.like) {
      if (this.fields.includes(field)) {
        query = query.and(field, 'like', options.like[field])
      }
    }
    for (const field in options.notEquals) {
      if (this.fields.includes(field)) {
        query = query.and(field, '!=', options.notEquals[field])
      }
    }
    for (const field of options.isNull) {
      if (this.fields.includes(field)) {
        query = query.andNull(field)
      }
    }
    for (const field of options.isNotNull) {
      if (this.fields.includes(field)) {
        query = query.andNotNull(field)
      }
    }
    return query.one()
  }

  getAllWhere(
    options = {
      equals: {},
      like: {},
      notEquals: {},
      equalsList: {},
      isNull: [],
      isNotNull: [],
    },
  ) {
    options = { equals: {}, like: {}, isNull: [], isNotNull: [], ...options }
    let query = this.select('*')
    for (const field in options.equals) {
      if (this.fields.includes(field)) {
        query = query.and(field, '=', options.equals[field])
      }
    }
    for (const field in options.like) {
      if (this.fields.includes(field)) {
        query = query.and(field, 'like', options.like[field])
      }
    }
    for (const field in options.notEquals) {
      if (this.fields.includes(field)) {
        query = query.and(field, '!=', options.notEquals[field])
      }
    }
    for (const field of options.isNull) {
      if (this.fields.includes(field)) {
        query = query.andNull(field)
      }
    }
    for (const field of options.isNotNull) {
      if (this.fields.includes(field)) {
        query = query.andNotNull(field)
      }
    }
    if (this.fields.includes(options?.equalsList?.field)) {
      for (const field of options.equalsList.values)
        query = query.or(options?.equalsList?.field, '=', field)
    }
    return query.all()
  }

  async create(obj) {
    const { insertId } = await this.db.query(
      `INSERT INTO \`${this.table_name}\` SET ?`,
      obj,
    )

    return await this.select('*').where('id', '=', insertId).one()
  }

  async createMany(objArr = []) {
    const promises = objArr.map((obj) =>
      this.db.query(`INSERT INTO \`${this.table_name}\` SET ?`, obj),
    )

    const result = await Promise.all(promises)

    const result_ids = result.map((v) => v.insertId)

    let id = result_ids.shift()

    let getCreatedQuery = this.select('*').where('id', '=', id)

    // do {
    //     getCreatedQuery.or('id', '=', id);
    // } while(id = result_ids.shift());

    return await getCreatedQuery.all()
  }

  async update(obj) {
    await this.db.query(`UPDATE \`${this.table_name}\` SET ? WHERE id = ?`, [
      obj,
      obj.id,
    ])

    const result = await this.select('*').where('id', '=', obj.id).one()

    return result
  }

  async delete(id) {
    const temp = await this.select('*').where('id', '=', id).one()

    if (!temp)
      // If doesnt exists
      return false

    const r = await this.db.query(
      `DELETE FROM \`${this.table_name}\` WHERE id = ?`,
      id,
    )

    return r.affectedRows > 0
  }

  raw(value) {
    return new RawValue(value)
  }
}

module.exports = BaseModel
