const aobj = require('aobj')
const { typeMessages, typeErrorMessages, MODELS } = require('../helpers/enums')
const userStudyCentresModel = require('../models/user_study_centres')
const { getInfoUserByUUID } = require('../helpers/funtions')
const sendMail = require('../helpers/sendMail')
const UserStudyCentresServices = require('../services/domain/user_study_centres.service')

const VERIFY_STATUS = {
  NO_INICIADO: 1,
  EN_PROCESO: 2,
  VERIFICADO: 3,
}

module.exports = {
  create: () => async (req, res) => {
    let studycentreInput = aobj.extract(req.body, [
      'name',
      'course_name',
      'description',
      'start_date',
      'end_date',
      'studying_here',
    ])

    if (
      studycentreInput.description &&
      studycentreInput.description.length > 500
    ) {
      return res.json({
        status: false,
        message: 'Subtitle must be less than 500 characters',
        message_es: 'El subtitulo debe contener menos de 500 caracteres',
      })
    }

    if (studycentreInput.studying_here) {
      delete studycentreInput.end_date
    }

    studycentreInput.user_uuid = req.session.user_uuid
    let data = await userStudyCentresModel.create(studycentreInput)

    return res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res, next) => {
    try {
      let studycentreInput = aobj.extract(req.body, [
        'id',
        'name',
        'course_name',
        'description',
        'start_date',
        'end_date',
        'studying_here',
      ])

      let exists = await userStudyCentresModel.getOneWhere({
        equals: { id: studycentreInput.id, user_uuid: req.session.user_uuid },
      })

      if (!exists) {
        return res.json({
          status: false,
          message: typeErrorMessages.CENTRE_NOT_FOUND,
          message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
        })
      }

      if (
        studycentreInput.description &&
        studycentreInput.description.length > 500
      ) {
        return res.json({
          status: false,
          message: 'Description must be less than 500 characters',
          message_es: 'La descripción debe contener menos de 500 caracteres',
        })
      }

      if (studycentreInput.studying_here) {
        delete studycentreInput.end_date
      }

      studycentreInput.user_uuid = req.session.user_uuid

      let data = await userStudyCentresModel.update(studycentreInput)

      res.json({
        status: true,
        message: typeMessages.PATCH_RESPONSE_MESSAGE,
        message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
        data: data,
      })
    } catch (error) {
      next(error)
    }
  },

  delete: () => async (req, res, next) => {
    try {
      let userStudyCentresInput = aobj.extract(req.body, ['id'])
      let exists = false
      exists = await userStudyCentresModel.getOneWhere({
        equals: { id: userStudyCentresInput.id },
      })
      if (!exists) {
        return res.json({
          status: false,
          message: typeErrorMessages.CENTRE_NOT_FOUND,
          message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
        })
      }

      let data = userStudyCentresModel.delete(exists.id)
      res.json({
        status: true,
        message: typeMessages.DELETE_RESPONSE_MESSAGE,
        message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
        data: data,
      })
    } catch (error) {
      next(error)
    }
  },

  verifiedStudyCentresInit: () => async (req, res, next) => {
    try {
      const { study_id, user_uuid, lang = 'en' } = req.body
      const userUuid = req.session.user_uuid ?? user_uuid

      const getStudy = await MODELS.UserStudyCentres.findOne({
        attributes: [
          'id',
          'user_uuid',
          'name',
          'course_name',
          'verify_status_id',
        ],
        where: {
          user_uuid: userUuid,
          id: study_id,
        },
      })

      if (!getStudy) throw new Error('Not found')

      const { verify_status_id } = getStudy

      if (verify_status_id === VERIFY_STATUS.NO_INICIADO) {
        const updated = await getStudy.update({
          verify_status_id: VERIFY_STATUS.EN_PROCESO,
        })

        //TODO!: Enviar el template 72 horas
        const getInfoUser = await getInfoUserByUUID({ user_uuid: userUuid })
        sendMail({
          to: {
            name: getInfoUser.person.name,
            last_name: getInfoUser.person.last_name,
            email: getInfoUser.email,
          },
          variables: {
            WEB_URL: process.env.WEB_URL,
            talent: getInfoUser,
            institution_name: getStudy.name,
            studies_name: getStudy.course_name,
          },
          mail_path: `mails/templates/mail-reception-study-${lang}.html`,
          subject: lang == 'es' ? '¡Solicitud recibida!' : 'Request received!',
        })

        return res.json({
          status: true,
          message: 'Verification in process',
          message_es: 'Verificación en proceso',
          data: updated,
        })
      }

      return res.json({
        status: true,
        message: 'Verification in process',
        message_es: 'Verificación en proceso',
        data: getStudy,
      })
    } catch (error) {
      next(error)
    }
  },

  verifiedStudyCentresByAdmin: () => async (req, res, next) => {
    try {
      const { study_id, user_uuid, lang = 'en' } = req.body
      const userUuid = user_uuid

      const getStudy = await MODELS.UserStudyCentres.findOne({
        attributes: [
          'id',
          'user_uuid',
          'name',
          'course_name',
          'verify_status_id',
        ],
        where: {
          user_uuid: userUuid,
          id: study_id,
        },
      })

      if (!getStudy) throw new Error('Not found')

      const { verify_status_id } = getStudy

      if (verify_status_id === VERIFY_STATUS.EN_PROCESO) {
        const updated = await getStudy.update({
          verify_status_id: VERIFY_STATUS.VERIFICADO,
        })

        //TODO!: Enviar el template de confirmación
        const getInfoUser = await getInfoUserByUUID({ user_uuid: userUuid })

        sendMail({
          to: {
            name: getInfoUser.person.name,
            last_name: getInfoUser.person.last_name,
            email: getInfoUser.email,
          },
          variables: {
            WEB_URL: process.env.WEB_URL,
            talent: getInfoUser,
            institution_name: getStudy.name,
            studies_name: getStudy.course_name,
          },
          mail_path: `mails/templates/mail-verification-study-${lang}.html`,
          subject:
            lang == 'es'
              ? '¡Verificación procesada!'
              : 'Verification processed!',
        })

        return res.json({
          status: true,
          message: 'Verified work',
          message_es: 'Trabajo verificado',
          data: updated,
        })
      }

      return res.json({
        status: true,
        message: 'Verified work',
        message_es: 'Trabajo verificado',
        data: getStudy,
      })
    } catch (error) {
      next(error)
    }
  },

  getListByUuid: () => async (req, res, next) => {
    try {
      const userUuid = req.session.user_uuid
      const userStudyCentresServices = new UserStudyCentresServices()
      const { page, length, order = [], ...where } = req.query

      const { data, last_page } = await userStudyCentresServices.datatable({
        page,
        length,
        order,
        attributes: [
          'id',
          'user_uuid',
          'name',
          'course_name',
          'description',
          'start_date',
          'end_date',
          'studying_here',
          'verify_status_id',
        ],
        include: [
          {
            attributes: ['id', 'status'],
            model: MODELS.UserWorkplaceVerifyStatus,
          },
        ],
        ...{ user_uuid: userUuid, ...(where && where) },
      })
      return res.json({
        status: true,
        meta: {
          last_page,
        },
        data,
      })
    } catch (error) {
      next(error)
    }
  },

  createByAdmin: () => async (req, res, next) => {
    try {
      const { data: bodyList } = req.body

      for (const bodyItem of bodyList) {
        let studycentreInput = aobj.extract(bodyItem, [
          'user_uuid',
          'name',
          'course_name',
          'description',
          'start_date',
          'end_date',
          'studying_here',
          'verify_status_id',
        ])

        if (
          studycentreInput.description &&
          studycentreInput.description.length > 500
        ) {
          return res.json({
            status: false,
            message: 'Subtitle must be less than 500 characters',
            message_es: 'El subtitulo debe contener menos de 500 caracteres',
          })
        }

        if (studycentreInput.studying_here) {
          delete studycentreInput.end_date
        }

        await userStudyCentresModel.create(studycentreInput)
      }

      return res.json({
        status: true,
        message: typeMessages.POST_RESPONSE_MESSAGE,
        message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      })
    } catch (error) {
      next(error)
    }
  },
}
