const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'project_application_files',
  connection: db,
  fields: ['user_uuid', 'project_id', 'file_url', 'file_name', 'file_size'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class ProjectApplicationFiles extends BaseModel {
  constructor() {
    super(options)
  }

  datatable(req) {
    return dataTableSearch
      .onRequest(req)
      .byFields(this.fields, async ({ length, order, search, start }) => {
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

        if (req.query.project_id) {
          countQuery = countQuery.and('project_id', '=', req.query.project_id)
          dataQuery = dataQuery.and('project_id', '=', req.query.project_id)
        }

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

module.exports = new ProjectApplicationFiles()
