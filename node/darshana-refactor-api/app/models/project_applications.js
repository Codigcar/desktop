const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'project_applications',
  connection: db,
  fields: [
    'user_uuid',
    'project_id',

    'proposal',
    'procedure_text',
    'accept_price',
    'price_proposal',
    'accept_time',
    'close_at_proposal',
    'accepted',
    'ready_to_close',

    'recieve_pay_order_id',
    'recieve_pay_at',
    'send_pay_order_id',
    'send_pay_at',
    'talent_payment',
    'weeks',
    'shown_accepted_message',
    'algorand_transaction',
    'near_transaction',
  ],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class ProjectApplications extends BaseModel {
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

        if (req.query.project_id) {
          countQuery = countQuery.and('project_id', '=', req.query.project_id)
          dataQuery = dataQuery.and('project_id', '=', req.query.project_id)
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

        if (req.query.user_uuid) {
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

  getProjectWithAlgorandOrNearTransactionByUuid(uuid) {
    let dataQuery = this.select([
      this.raw(
        'project_applications.user_uuid, project_applications.algorand_transaction, project_applications.near_transaction, projects.id, projects.name, projects.project_status_id',
      ),
    ])
      .innerJoin('projects')
      .on('project_applications.project_id', '=', 'projects.id')

    dataQuery = dataQuery
      .openBrackets()
      .orNotNull('project_applications.algorand_transaction', 'withoutScapeId')
      .orNotNull('project_applications.near_transaction', 'withoutScapeId')
      .closeBrackets()

    dataQuery = dataQuery.and(
      'project_applications.user_uuid',
      '=',
      uuid,
      'withoutScapeId',
    )

    dataQuery = dataQuery.and(
      'projects.project_status_id',
      '=',
      3,
      'withoutScapeId',
    )

    const data = dataQuery.all()
    return data
  }
}

module.exports = new ProjectApplications()
