module.exports = {
  datatable: () => async (req: any, res: any) => {
    const { MODELS } = require('../helpers/enums')
    let { page, length, order = [], ...where } = req.query

    const { column = null, dir = null } = order[0] ?? []
    const limit = parseInt(length) || 999999
    page = parseInt(page)

    const whereConditionl = {
      ...(where && where),
    }

    const options = {
      order: [[column ?? 'id', dir ?? 'asc']],
      offset: page ? --page * limit : undefined,
      limit,
      where: whereConditionl,
    }

    const count = await MODELS.Languages.count(options)
    const last_page = Math.ceil(count / limit)
    const getChatGpts = await MODELS.Languages.findAll({
      attributes: ['id', 'name_en', 'name_es'],
      ...options,
    })
    return res.json({
      status: true,
      meta: {
        last_page: last_page,
      },
      data: getChatGpts,
    })
  },
}
