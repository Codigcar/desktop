const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'user_workplaces',
  connection: db,
  fields: [
    'user_uuid',
    'position',
    'start_date',
    'end_date',
    'description',
    'work_here',
    'position',
    'workplace_id',
    'workplace_name',
    'enable_business',
  ],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class UserWorkplaces extends BaseModel {
  constructor() {
    super(options)
  }

  datatable(req, opts = {}) {
    return dataTableSearch
      .onRequest(req)
      .byFields(this.fields, async ({ length, order, search, start }) => {
        let countQuery = this.select(this.raw('COUNT(id) as count')).whereNull(
          'deleted_at',
        )
        let dataQuery = this.select('*').whereNull('deleted_at')
        if (opts.user_uuid) {
          countQuery = countQuery.and('user_uuid', '=', opts.user_uuid)
          dataQuery = dataQuery.and('user_uuid', '=', opts.user_uuid)
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

module.exports = new UserWorkplaces()
