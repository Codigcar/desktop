const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'job_applications',
  connection: db,
  fields: [
    'user_uuid',
    'job_id',

    'summary',
    'experience',
    'file_url',
    'file_name',
    'file_size',
    'selected',

    'time_proposal',

    'ready_to_close',
    'close_at_proposal',
    'algorand_transaction',
    'near_transaction',
  ],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class JobApplications extends BaseModel {
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

        if (req.query.job_id) {
          countQuery = countQuery.and('job_id', '=', req.query.job_id)
          dataQuery = dataQuery.and('job_id', '=', req.query.job_id)
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

        if (req?.query?.user_uuid) {
          dataQuery = dataQuery.and('user_uuid', '=', req.query.user_uuid)
          countQuery = countQuery.and('user_uuid', '=', req.query.user_uuid)
        }

        dataQuery = dataQuery.orderBy(order).limit(length, start)

        const { count } = await countQuery.one()
        const data = await dataQuery.all()

        return {
          count,
          data,
        }
      })
  }

  getJobWithAlgorandOrNearTransactionByUuid(uuid) {
    let dataQuery = this.select([
      this.raw(
        // "job_applications.user_uuid,job_applications.algorand_transaction, job_applications.id, job_applications.near_transaction, jobs.name, jobs.description, jobs.contract_type, jobs.summary, jobs.salary, jobs.end_date, jobs.contract_time, jobs.work_modality_id, jobs.country_id"
        'job_applications.user_uuid, job_applications.algorand_transaction, job_applications.near_transaction, jobs.id, jobs.name, jobs.job_status_id',
      ),
    ])
      .innerJoin('jobs')
      .on('job_applications.job_id', '=', 'jobs.id')

    dataQuery = dataQuery
      .openBrackets()
      .orNotNull('job_applications.algorand_transaction', 'withoutScapeId')
      .orNotNull('job_applications.near_transaction', 'withoutScapeId')
      .closeBrackets()

    dataQuery = dataQuery.and(
      'job_applications.user_uuid',
      '=',
      uuid,
      'withoutScapeId',
    )

    dataQuery = dataQuery.and('jobs.job_status_id', '=', 3, 'withoutScapeId')

    const data = dataQuery.all()
    return data
  }
}

module.exports = new JobApplications()
