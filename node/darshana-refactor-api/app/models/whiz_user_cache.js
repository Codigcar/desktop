const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'whiz_user_cache',
  connection: db,
  fields: ['user_uuid', 'response'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class WhizUserCache extends BaseModel {
  constructor() {
    super(options)
  }
  async getByUuid(user_uuid) {
    let t = await this.select('*')
      .whereNull('deleted_at')
      .and('user_uuid', '=', user_uuid)
      .one()
    if (t) {
      try {
        return JSON.parse(t.response)
      } catch (error) {
        console.log(t, error)
        //logger.error('couldnt parse whiz user cache id '+t.id);
      }
    }
    return null
  }
  async saveByUuid(user_uuid, data) {
    let t = await this.select('*')
      .whereNull('deleted_at')
      .and('user_uuid', '=', user_uuid)
      .one()
    if (t) {
      await this.update({ id: t.id, response: JSON.stringify(data) })
    } else {
      await this.create({
        user_uuid: user_uuid,
        response: JSON.stringify(data),
      })
    }
  }
}

module.exports = new WhizUserCache()
