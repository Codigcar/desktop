const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const EventEmitter = require('events')
const db = require('./common/database')

const options = {
  table_name: 'notifications',
  connection: db,
  fields: ['user_uuid', 'message', 'action', 'been_read', 'been_clicked'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

const notificationEmitter = new EventEmitter()

class Notifications extends BaseModel {
  constructor() {
    super(options)
  }

  async create(obj) {
    const { insertId } = await this.db.query(
      `INSERT INTO \`${this.table_name}\` SET ?`,
      obj,
    )
    let created = await this.select('*').where('id', '=', insertId).one()
    notificationEmitter.emit('notification', created)
    return created
  }

  getEmitter() {
    return notificationEmitter
  }

  datatable(req, options = { onlytalents: false }) {
    return dataTableSearch
      .onRequest(req)
      .byFields(this.fields, async ({ length, order, search, start }) => {
        let countQuery = this.select(this.raw('COUNT(id) as count')).whereNull(
          'deleted_at',
        )
        let dataQuery = this.select('*').whereNull('deleted_at')

        if (options.onlytalents) {
          countQuery = countQuery.andOpenBrackets()
          countQuery = countQuery.and('is_talent', '=', '1')
          countQuery = countQuery.closeBrackets()
          dataQuery = dataQuery.andOpenBrackets()
          dataQuery = dataQuery.and('is_talent', '=', '1')
          dataQuery = dataQuery.closeBrackets()
        }
        if (req.query.user_uuid) {
          dataQuery = dataQuery.and('user_uuid', '=', req.query.user_uuid)
          countQuery = countQuery.and('user_uuid', '=', req.query.user_uuid)
        }
        if (req.query.type) {
          dataQuery = dataQuery.and('n_type', '=', req.query.type)
          countQuery = countQuery.and('n_type', '=', req.query.type)
        }

        countQuery = dataTableSearch.decorateSearch(
          countQuery,
          this.fields,
          search.value,
        )
        dataQuery = dataTableSearch.decorateSearch(
          dataQuery,
          this.fields,
          search.value,
        )

        dataQuery = dataQuery
          .orderBy(order.column, order.dir)
          .limit(length, start)

        const { count } = await countQuery.one()
        const data = await dataQuery.all()

        return {
          count,
          data,
        }
      })
  }
}

module.exports = new Notifications()
