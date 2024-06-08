const aobj = require('aobj')
const qs = require('qs')

function cleanMeta(obj) {
  delete obj.current_page
  delete obj.from
  delete obj.last_page
  delete obj.path
  delete obj.per_page
  delete obj.to
  delete obj.showing
  delete obj.total

  return obj
}

function _paginate(
  url,
  start,
  length,
  search,
  count,
  showing,
  meta = { fields_map: {} },
  query,
) {
  length = parseInt(length)
  start = parseInt(start)

  let current_page = start / length + 1
  let last_page = Math.ceil(count / length)

  let searchObject = { ...query, search }

  return {
    links: {
      first:
        (process.env.BASE_URL || '') +
        url +
        qs.stringify(
          { ...searchObject, page: 1 },
          { addQueryPrefix: true, encode: false },
        ),
      last:
        (process.env.BASE_URL || '') +
        url +
        qs.stringify(
          { ...searchObject, page: last_page },
          { addQueryPrefix: true, encode: false },
        ),
      prev:
        current_page > 1
          ? (process.env.BASE_URL || '') +
            url +
            qs.stringify(
              { ...searchObject, page: current_page - 1 },
              { addQueryPrefix: true, encode: false },
            )
          : '',
      next:
        current_page < last_page
          ? (process.env.BASE_URL || '') +
            url +
            qs.stringify(
              { ...searchObject, page: current_page + 1 },
              { addQueryPrefix: true, encode: false },
            )
          : '',
    },
    meta: {
      start,
      length,
      current_page: start / length + 1,
      from: start,
      last_page: Math.ceil(count / length),
      path: (process.env.BASE_URL || '') + url,
      per_page: length,
      to: length,
      showing,
      total: count,
      ...cleanMeta(meta),
    },
  }
}

function onRequest(request) {
  return {
    async byFields(
      fields = [],
      cb = async () => {
        return {
          count: 0,
          data: [],
        }
      },
    ) {
      if (!fields) throw 'Fields cant be an empty Array []'
      if (!fields.length) throw 'Fields cant be an empty Array []'
      if (fields.length <= 0) throw 'Fields cant be an empty Array []'

      const url = request.originalUrl.split('?')[0]

      let {
        search = { column: '', data: '' },
        start = 0,
        length = 8,
        page = 1,
        order = null,
        meta = { fields_map: {} },
      } = request.query

      console.log('datatable.js - 72')
      console.log(search)

      if (typeof order == 'string' && order?.includes('\n'))
        order = order.replace('\n', '')
      if (typeof order == 'string' && order?.includes(',')) {
        order = JSON.parse(order)
        request.query.order = order
      }

      if (page) {
        start = Math.floor(page * length - length)
      }

      if (!search.column) search.column = ''
      if (!search.data) search.data = ''
      if (!meta.fields_map) meta.fields_map = {}

      if (Object.keys(meta.fields_map).length === 0) {
        meta.fields_map = aobj.invert(fields)
      }
      if (!search.column) {
        search.column = fields[0]
      }

      const { count, data } = await Promise.resolve(
        cb({
          fields,
          search,
          start,
          length,
          order: order || [{ column: 'id', dir: 'ASC' }],
          meta,
        }),
      )

      const paginate = _paginate(
        url,
        start,
        length,
        search,
        count,
        data.length,
        meta,
        request.query,
      )

      return {
        ...paginate,
        data,
      }
    },
  }
}

function decorateSearch(query, fields, searchValue = '') {
  if (query.openBrackets) query = query.openBrackets()
  else query = query.andOpenBrackets()
  for (const field of fields)
    query = query.or(field, 'LIKE', '%' + (searchValue || '') + '%')
  query = query.closeBrackets()
  return query
}

module.exports = {
  onRequest,
  decorateSearch,
}
