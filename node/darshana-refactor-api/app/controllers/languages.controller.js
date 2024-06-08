'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
module.exports = {
  datatable: () => (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a
      const { MODELS } = require('../helpers/enums')
      let _b = req.query,
        { page, length, order = [] } = _b,
        where = __rest(_b, ['page', 'length', 'order'])
      const { column = null, dir = null } =
        (_a = order[0]) !== null && _a !== void 0 ? _a : []
      const limit = parseInt(length) || 999999
      page = parseInt(page)
      const whereConditionl = Object.assign({}, where && where)
      const options = {
        order: [
          [
            column !== null && column !== void 0 ? column : 'id',
            dir !== null && dir !== void 0 ? dir : 'asc',
          ],
        ],
        offset: page ? --page * limit : undefined,
        limit,
        where: whereConditionl,
      }
      const count = yield MODELS.Languages.count(options)
      const last_page = Math.ceil(count / limit)
      const getChatGpts = yield MODELS.Languages.findAll(
        Object.assign({ attributes: ['id', 'name_en', 'name_es'] }, options),
      )
      return res.json({
        status: true,
        meta: {
          last_page: last_page,
        },
        data: getChatGpts,
      })
    }),
}
