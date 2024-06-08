const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'leads',
  connection: db,
  fields: ['user_uuid', 'title', 'query_type', 'description', 'email'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class Leads extends BaseModel {
  constructor() {
    super(options)
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

module.exports = new Leads()
