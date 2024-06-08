const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'user_places_of_interest',
  connection: db,
  fields: ['id', 'place_of_interes_id', 'user_detail_id'],
  control_fields: ['id', 'place_of_interes_id', 'user_detail_id'],
}

class UserPlacesOfInterest extends BaseModel {
  constructor() {
    super(options)
  }
  getByUser(userDetailId) {
    return this.select('*').where('user_detail_id', '=', userDetailId)
  }
  getByPlace(placesOfInterestId) {
    return this.select('*').where(
      'place_of_interes_id',
      '=',
      placesOfInterestId,
    )
  }
  datatable(req) {
    return dataTableSearch
      .onRequest(req)
      .byFields(this.fields, async ({ length, order, search, start }) => {
        let countQuery = this.select(this.raw('COUNT(id) as count'))
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

        dataQuery = dataQuery.orderBy(order).limit(length, start)

        const { count } = await countQuery.one()
        const data = await dataQuery.all()

        return {
          count,
          data,
        }
      })
  }
}

module.exports = new UserPlacesOfInterest()
