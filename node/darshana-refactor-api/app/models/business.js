const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'business',
  connection: db,
  fields: [
    'user_workplace_id',
    'user_uuid',
    'profile_picture_url',
    'profile_banner_url',
  ],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class Business extends BaseModel {
  constructor() {
    super(options)
  }

  datatable(req) {
    return dataTableSearch.onRequest(req).byFields(
      this.fields,
      async ({
        // fields,
        length,
        order,
        search,
        start,
      }) => {
        let countQuery = this.select(this.raw('COUNT(id) as count')).whereNull(
          'deleted_at',
        )
        let dataQuery = this.select('*').whereNull('deleted_at')

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
      },
    )
  }
}

module.exports = new Business()