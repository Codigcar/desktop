const dataTableSearch = require('../helpers/datatable')
const BaseModel = require('./common/BaseModel')
const db = require('./common/database')

const options = {
  table_name: 'user_details',
  connection: db,
  fields: [
    'user_uuid',
    'full_name',
    'purpose',
    'country_id',
    'city_id',
    'subtitle',
    'summary',
    'profile_picture_url',
    'profile_banner_url',
    'is_talent',
    'google_id',
    'facebook_url',
    'twitter_url',
    'github_url',
    'linkedin_url',
    'discord_url',
    'contact_email',
    'contact_phone',
    'contact_phone2',
    'paypal_email',
    'paypal_url',
    'algo_address',
    'near_wallet',
    'profile_percentage',
    'verify_email',
    'default_cover_image_url',
    'other_link_work',
    'cv_resumen_file_name',
    'cv_resumen_file_size',
    'cv_resumen_file_url',
    'sex',
  ],
  control_fields: ['id', 'created_at', 'updated_at', 'deleted_at'],
}

class UserDetails extends BaseModel {
  constructor() {
    super(options)
  }
  getByUuid(uuid) {
    return this.select('*')
      .whereNull('deleted_at')
      .and('user_uuid', '=', uuid)
      .one()
  }
  datatable(
    req,
    options = { onlytalents: false, user_uuids: [], id: [], full_name: '' },
  ) {
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

        if (options.user_uuids) {
          for (const uuid of options.user_uuids) {
            countQuery = countQuery.or('user_uuid', '=', uuid)
            dataQuery = dataQuery.or('user_uuid', '=', uuid)
          }
        }

        if (options.id || options.full_name) {
          dataQuery.andOpenBrackets()
          countQuery.andOpenBrackets()
          for (const id of options.id) {
            countQuery = countQuery.or('id', '=', id)
            dataQuery = dataQuery.or('id', '=', id)
          }
          if (options.full_name) {
            countQuery = countQuery.orWithAndAtStart(
              'full_name',
              'like',
              '%' + options.full_name + '%',
            )
            dataQuery = dataQuery.orWithAndAtStart(
              'full_name',
              'like',
              '%' + options.full_name + '%',
            )
          }
          dataQuery.closeBrackets()
          countQuery.closeBrackets()
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
}

module.exports = new UserDetails()
