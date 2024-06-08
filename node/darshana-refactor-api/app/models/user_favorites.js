const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'user_favorites',
  connection: db,
  fields: ['user_uuid', 'favorite_uuid', 'type'],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class UserFavorites extends BaseModel {
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

        if (req.query.type) {
          dataQuery = dataQuery.and('type', '=', req.query.type)
          countQuery = countQuery.and('type', '=', req.query.type)
        }
        if (req.query.favorite_uuid) {
          dataQuery = dataQuery.and(
            'favorite_uuid',
            '=',
            req.query.favorite_uuid,
          )
          countQuery = countQuery.and(
            'favorite_uuid',
            '=',
            req.query.favorite_uuid,
          )
        }
        dataQuery = dataQuery.and('user_uuid', '=', req.session.user_uuid)
        countQuery = countQuery.and('user_uuid', '=', req.session.user_uuid)

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

module.exports = new UserFavorites()
