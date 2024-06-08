const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'places_of_interest',
  connection: db,
  fields: ['id', 'name'],
}

class PlacesOfInterest extends BaseModel {
  constructor() {
    super(options)
  }
  getByName(name) {
    return this.select('*').where('name', 'like', '%' + name + '%')
  }
  datatable(req) {
    return dataTableSearch
      .onRequest(req)
      .byFields(this.fields, async ({ length, order, search, start }) => {
        let countQuery = this.select(this.raw('COUNT(id) as count'))
        let dataQuery = this.select('*')

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

module.exports = new PlacesOfInterest()
