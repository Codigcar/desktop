const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'user_details_skills',
  connection: db,
  fields: ['id', 'user_detail_id', 'skill_id'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class UserDetailsSkills extends BaseModel {
  constructor() {
    super(options)
  }

  datatable(req, options = { skill_ids: [] }) {
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

        if (options.skill_ids) {
          for (const uuid of options.skill_ids) {
            countQuery = countQuery.or('skill_id', '=', uuid)
            dataQuery = dataQuery.or('skill_id', '=', uuid)
          }
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

module.exports = new UserDetailsSkills()
