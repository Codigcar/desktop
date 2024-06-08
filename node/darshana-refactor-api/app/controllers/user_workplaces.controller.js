const aobj = require('aobj')
const userWorkplacesModel = require('../models/user_workplaces')
const businessModel = require('../models/business')
const workplaces = require('../models/workplaces')
const userDetailsModel = require('../models/user_details')
const { typeMessages, typeErrorMessages, MODELS } = require('../helpers/enums')
const UserWorkplaceServices = require('../services/domain/user_workplace.service')
const sendMail = require('../helpers/sendMail')
const { getInfoUserByUUID } = require('../helpers/funtions')
const logger = require('../helpers/logger')
// const whizService = require('../services/whiz')

const VERIFY_STATUS = {
  NO_INICIADO: 1,
  EN_PROCESO: 2,
  VERIFICADO: 3,
}

module.exports = {
  /* listar all */
  datatable: () => async (req, res) => {
    const userWorkplaceServices = new UserWorkplaceServices()

    const { page, length, order = [], ...where } = req.query
    const { data, last_page } = await userWorkplaceServices.datatable({
      page,
      length,
      order,
      attributes: [
        'user_uuid',
        'start_date',
        'end_date',
        'id',
        'work_here',
        'position',
        'workplace_id',
        'workplace_name',
        'enable_business',
        'verify_status_id',
      ],
      include: [
        {
          attributes: ['id', 'status'],
          model: MODELS.UserWorkplaceVerifyStatus,
        },
      ],
      ...where,
    })

    return res.json({
      status: true,
      meta: {
        last_page,
      },
      data,
    })
  },

  /* listar by user_uuid */
  list: () => async (req, res, next) => {
    try {
      const userWorkplaceServices = new UserWorkplaceServices()
      const userUuid = req.session.user_uuid

      const { page, length, order = [], ...where } = req.query
      const { data, last_page } = await userWorkplaceServices.datatable({
        page,
        length,
        order,
        attributes: [
          'id',
          'user_uuid',
          'description',
          'position',
          'workplace_id',
          'workplace_name',
          'verify_status_id',
          'start_date',
          'end_date',
          'work_here',
          'deleted_at',
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

  create: () => async (req, res) => {
    let workplaceInput = aobj.extract(req.body, [
      'start_date',
      'end_date',
      'description',
      'work_here',
      'position',
      'workplace_name',
      'enable_business',
    ])

    const enableBusiness = workplaceInput.enable_business

    if (workplaceInput.description && workplaceInput.description.length > 500) {
      return res.json({
        status: false,
        message: 'El subtitulo debe contener menos de 150 caracteres',
      })
    }

    if (workplaceInput.work_here) {
      delete workplaceInput.end_date
    }

    workplaceInput.user_uuid = req.session.user_uuid

    //workplace
    let workplaceFound = await workplaces.getOneWhere({
      equals: { name: workplaceInput.workplace_name },
    })
    if (!workplaceFound) {
      workplaceFound = await workplaces.create({
        name: workplaceInput.workplace_name,
      })
    }
    workplaceInput.workplace_name = workplaceFound.name
    workplaceInput.workplace_id = workplaceFound.id

    let data = await userWorkplacesModel.create(workplaceInput)

    data.business = await businessModel.getOneWhere({
      equals: { user_workplace_id: data.id },
    })

    // crear business
    if (enableBusiness && !data.business) {
      businessModel.create({
        user_workplace_id: data.id,
        user_uuid: data.user_uuid,
      })
      const userDetail = await userDetailsModel.getByUuid(req.session.user_uuid)
      if (userDetail.is_talent) {
        await userDetailsModel.update({ ...userDetail, is_talent: false })
      }
    }

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res, next) => {
    try {
      const userUuid = req.session.user_uuid
      let workplaceInput = aobj.extract(req.body, [
        'id',
        'start_date',
        'end_date',
        'description',
        'work_here',
        'position',
        'workplace_name',
        'enable_business',
      ])

      if (workplaceInput.work_here) {
        workplaceInput.end_date = null
      }

      let exists = await userWorkplacesModel.getOneWhere({
        equals: { id: workplaceInput.id, user_uuid: userUuid },
      })

      if (!exists) {
        return res.json({
          status: false,
          message: typeErrorMessages.CENTRE_NOT_FOUND,
          message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
        })
      }

      if (
        workplaceInput.description &&
        workplaceInput.description.length > 500
      ) {
        return res.json({
          status: false,
          message: 'El subtitulo debe contener menos de 150 caracteres',
        })
      }

      workplaceInput.user_uuid = userUuid

      //workplace
      let workplaceFound = await workplaces.getOneWhere({
        equals: { name: workplaceInput.workplace_name },
      })
      if (!workplaceFound) {
        workplaceFound = await workplaces.create({
          name: workplaceInput.workplace_name,
        })
      }
      workplaceInput.workplace_name = workplaceFound.name
      workplaceInput.workplace_id = workplaceFound.id

      let data = await userWorkplacesModel.update(workplaceInput)

      data.business = await businessModel.getOneWhere({
        equals: { user_workplace_id: data.id },
      })

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

  delete: () => async (req, res) => {
    let workplaceInput = aobj.extract(req.body, ['id'])
    let exists = false
    exists = await userWorkplacesModel.getOneWhere({
      equals: { id: workplaceInput.id },
    })
    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.CENTRE_NOT_FOUND,
        message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
      })
    }

    let data = userWorkplacesModel.delete(exists.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  search: () => async (req, res) => {
    const workplace_name = req.query.workplace_name
      ? req.query.workplace_name
      : ''
    const workplace = await userWorkplacesModel.getAll()
    let found = workplace.filter((item) =>
      item.workplace_name.toLowerCase().includes(workplace_name.toLowerCase()),
    )

    // filtrar repetidos name

    let hash = {}
    found = found.filter((business) =>
      hash[business.workplace_name]
        ? false
        : (hash[business.workplace_name] = true),
    )

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: found,
    })
  },

  verifiedWorkPlacesTalent: () => async (req, res, next) => {
    try {
      const {
        workplace_list,
        user_uuid,
        lang = 'en',
        email,
        is_talent,
      } = req.body

      const getWorkplace = await MODELS.UserWorkPlaces.findAll({
        attributes: [
          'id',
          'user_uuid',
          'description',
          'position',
          'workplace_id',
          'workplace_name',
          'verify_status_id',
        ],
        where: {
          user_uuid: user_uuid,
        },
      })
      if (!getWorkplace) throw new Error('Not found')

      const matchingWorkplaces = []

      for (let i = 0; i < workplace_list.length; i++) {
        const matchingElement = getWorkplace.find(
          (item) => item.id === Number(workplace_list[i]),
        )
        if (matchingElement) {
          matchingWorkplaces.push(matchingElement)
        }
      }
      for (const bodyItem of matchingWorkplaces) {
        const { verify_status_id } = bodyItem

        if (verify_status_id === VERIFY_STATUS.NO_INICIADO) {
          await bodyItem.update({
            verify_status_id: VERIFY_STATUS.EN_PROCESO,
          })
        }
      }
      if (!is_talent) {
        const getCheckouts = await MODELS.ValidationCheckoutModel.findAll({
          where: {
            email,
          },
          order: [['createdAt', 'DESC']],
        })
        if (getCheckouts.length < 0) {
          throw 'no hay datos '
        }

        if (getCheckouts[0].datavalues?.verification_number > 0) {
          throw 'verification number bajos'
        }
        const verificationNumberCurrent =
          getCheckouts[0].dataValues.verification_number

        const newVerificationNumber = verificationNumberCurrent - 1

        await MODELS.ValidationCheckoutModel.update(
          { verification_number: newVerificationNumber },
          {
            where: {
              id: getCheckouts[0].id,
            },
          },
        )
      }
      return res.json({
        status: true,
        message: 'Verification in process',
        message_es: 'Verificación en proceso',
      })
    } catch (error) {
      next(error)
    }
  },
  verifiedWorkPlace: () => async (req, res, next) => {
    try {
      const { workplace_id, user_uuid, lang = 'en' } = req.body
      const userUuid = req.session.user_uuid ?? user_uuid

      const getWorkplace = await MODELS.UserWorkPlaces.findOne({
        attributes: [
          'id',
          'user_uuid',
          'description',
          'position',
          'workplace_id',
          'workplace_name',
          'verify_status_id',
        ],
        where: {
          user_uuid: userUuid,
          id: workplace_id,
        },
      })

      if (!getWorkplace) throw new Error('Not found')

      const { verify_status_id } = getWorkplace

      if (verify_status_id === VERIFY_STATUS.NO_INICIADO) {
        const updated = await getWorkplace.update({
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
            job_name: getWorkplace.workplace_name,
            workplace_name: getWorkplace.workplace_name,
          },
          mail_path: `mails/templates/mail-reception-${lang}.html`,
          subject: lang == 'es' ? '¡Solicitud recibida!' : 'Request received!',
        })

        return res.json({
          status: true,
          message: 'Verification in process',
          message_es: 'Verificación en proceso',
          data: updated,
        })
      }

      if (verify_status_id === VERIFY_STATUS.EN_PROCESO) {
        const updated = await getWorkplace.update({
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
            job_name: getWorkplace.workplace_name,
            workplace_name: getWorkplace.workplace_name,
          },
          mail_path: `mails/templates/mail-verification-${lang}.html`,
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
        message: 'Experience is already verified',
        message_es: 'Experiencia ya se encuentra verificado',
      })
    } catch (error) {
      next(error)
    }
  },

  verifiedWorkPlaceFinish: () => async (req, res, next) => {
    try {
      const { workplace_id, user_uuid, lang = 'en' } = req.body
      const userUuid = user_uuid

      const getWorkplace = await MODELS.UserWorkPlaces.findOne({
        attributes: [
          'id',
          'user_uuid',
          'description',
          'position',
          'workplace_id',
          'workplace_name',
          'verify_status_id',
        ],
        where: {
          user_uuid: userUuid,
          id: workplace_id,
        },
      })

      if (!getWorkplace) throw new Error('Not found')

      const { verify_status_id } = getWorkplace

      if (verify_status_id === VERIFY_STATUS.EN_PROCESO) {
        const updated = await getWorkplace.update({
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
            job_name: getWorkplace.workplace_name,
            workplace_name: getWorkplace.workplace_name,
          },
          mail_path: `mails/templates/mail-verification-${lang}.html`,
          subject:
            lang == 'es'
              ? '¡Verificación procesada!'
              : 'Verification processed!',
        })

        return res.json({
          status: true,
          message: 'Verified experience',
          message_es: 'Experiencia verificado',
          data: updated,
        })
      }

      return res.json({
        status: true,
        message: 'Experience no existe o no se encuentra en proceso',
        message_es: 'Experience does not exist or is not in process',
      })
    } catch (error) {
      next(error)
    }
  },

  datatableVerifyStatus: () => async (req, res, next) => {
    try {
      const data = await MODELS.UserWorkplaceVerifyStatus.findAll({
        attributes: ['id', 'status'],
      })
      return res.json({
        status: true,
        data,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: user_workplaces.controller.js:464 ~ datatableVerifyStatus: ~ error:',
        error,
      )
      next(error)
    }
  },
}
