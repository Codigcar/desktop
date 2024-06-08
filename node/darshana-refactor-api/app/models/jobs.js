const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'jobs',
  connection: db,
  fields: [
    'job_status_id',
    'business_id',
    'name',
    'description',
    'end_date',
    'status',
    'contract_type',
    'summary',
    'salary',

    'contract_time',
    'is_visible',
    'user_uuid',
    'work_modality_id',
    'country_id',
  ],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class Projects extends BaseModel {
  constructor() {
    super(options)
  }

  datatable(req, _options = { ids: [] }) {
    return dataTableSearch
      .onRequest(req)
      .byFields(
        this.fields,
        async ({ fields, length, order, search, start }) => {
          let countQuery = this.select(
            this.raw('COUNT(id) as count'),
          ).whereNull('deleted_at')
          let dataQuery = this.select('*').whereNull('deleted_at')
          if (req.query.fromDate && req.query.fromDate === 'current') {
            countQuery = dataQuery.and(
              'end_date',
              '>=',
              new Date().toISOString().split('T')[0],
            )
            dataQuery = dataQuery.and(
              'end_date',
              '>=',
              new Date().toISOString().split('T')[0],
            )
          }

          //Validar campo is_visible
          countQuery = countQuery.and('is_visible', '=', true)
          dataQuery = dataQuery.and('is_visible', '=', true)

          if (fields[search.column]) {
            countQuery = countQuery.and(fields[search.column], '=', search.data)
            dataQuery = dataQuery.and(fields[search.column], '=', search.data)
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

          for (const id of _options.ids) {
            countQuery = countQuery
              .or('id', '=', id)
              .and('end_date', '>=', new Date().toISOString().split('T')[0])
            dataQuery = dataQuery
              .or('id', '=', id)
              .and('end_date', '>=', new Date().toISOString().split('T')[0])
          }

          if (req.query.user_uuid) {
            dataQuery = dataQuery.and('user_uuid', '=', req.query.user_uuid)
            countQuery = countQuery.and('user_uuid', '=', req.query.user_uuid)
          }

          if (req.query.job_status_id) {
            dataQuery = dataQuery.and(
              'job_status_id',
              '=',
              req.query.job_status_id,
            )
            countQuery = countQuery.and(
              'job_status_id',
              '=',
              req.query.job_status_id,
            )
          }

          dataQuery = dataQuery.orderBy(order).limit(length, start)
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

module.exports = new Projects()
