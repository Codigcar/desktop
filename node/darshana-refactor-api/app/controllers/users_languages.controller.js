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
module.exports = {
  datatable: () => (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { MODELS } = require('../helpers/enums')
      const { logger } = require('../helpers/logger.js')
      const { user_uuid } = req.session
      try {
        const getLanguagesByUser = yield MODELS.UsersLanguages.findAll({
          where: { '$user_detail.user_uuid$': user_uuid, deleted_at: null },
          attributes: ['id'],
          include: [
            {
              attributes: ['user_uuid', 'full_name'],
              model: MODELS.UserDetails,
            },
            {
              attributes: ['id', 'name_en', 'name_es'],
              model: MODELS.Languages,
            },
          ],
        })
        return res.json({
          status: true,
          data: getLanguagesByUser,
        })
      } catch (error) {
        logger.error(
          '🚀 ~ file: users_languages.controller.ts:27 ~ datatable: ~ error:',
          error,
        )
        next(error)
      }
    }),
  register_language: () => (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { MODELS } = require('../helpers/enums')
      const { logger } = require('../helpers/logger.js')
      const { user_uuid } = req.session
      const { language_id } = req.body
      try {
        const getUser = yield MODELS.UserDetails.findOne({
          where: { user_uuid, deleted_at: null },
        })
        if (!getUser)
          return res.status(404).json({
            status: false,
            message: 'User not found',
            message_es: 'Usuario no encontrado',
          })
        const register = yield MODELS.UsersLanguages.create({
          user_details_id: getUser.id,
          language_id,
        })
        return res.json({
          status: true,
          data: Object.assign(Object.assign({}, register.dataValues), {
            user_uuid: getUser.user_uuid,
          }),
        })
      } catch (error) {
        logger.error(
          '🚀 ~ file: users_languages.controller.ts:53 ~ register_language: ~ error:',
          error,
        )
        next(error)
      }
    }),
  delete_all: () => (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { MODELS } = require('../helpers/enums')
      const { logger } = require('../helpers/logger.js')
      const { user_uuid } = req.session
      try {
        const getUser = yield MODELS.UserDetails.findOne({
          where: { user_uuid, deleted_at: null },
        })
        if (!getUser)
          return res.status(404).json({
            status: false,
            message: 'User not found',
            message_es: 'Usuario no encontrado',
          })
        const deleteAll = yield MODELS.UsersLanguages.destroy({
          where: { user_details_id: getUser.id },
        })
        return res.json({
          status: true,
          data: deleteAll,
        })
      } catch (error) {
        logger.log(
          '🚀 ~ file: users_languages.controller.ts:81 ~ delete_all: ~ error:',
          error,
        )
        next(error)
      }
    }),
}
