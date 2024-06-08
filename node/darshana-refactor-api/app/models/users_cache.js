const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'users_cache',
  connection: db,
  fields: ['uuid', 'full_name'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class UserCache extends BaseModel {
  constructor() {
    super(options)
  }
  getByUuid(uuid) {
    return this.select('*').whereNull('deleted_at').and('uuid', '=', uuid).one()
  }
}

module.exports = new UserCache()
