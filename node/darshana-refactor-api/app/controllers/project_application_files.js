const aobj = require('aobj')
const projectsModel = require('../models/projects')
const projectApplicationsModel = require('../models/project_applications')
const projectApplicationFilesModel = require('../models/project_application_files')
const userDetailsModel = require('../models/user_details')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await projectApplicationFilesModel.datatable(req)

    for (const i in response.data) {
      let user = await userDetailsModel.getOneWhere({
        equals: { user_uuid: response.data[i].user_uuid },
      })
      if (user) {
        response.data[i].owner_image =
          user.profile_picture_url || process.env.DEFAULT_PROFILE_PICTURE
      }
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let input = aobj.extract(req.body, [
      'project_id',
      'file_url',
      'file_name',
      'file_size',
    ])

    input.user_uuid = req.session.user_uuid

    let project = await projectsModel.getOneWhere({
      equals: { id: input.project_id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    let application = await projectApplicationsModel.getOneWhere({
      equals: {
        user_uuid: input.user_uuid,
        project_id: project.id,
        accepted: 1,
      },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    let data = await projectApplicationFilesModel.create(input)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let projectApplicationFileInput = aobj.extract(req.body, [
      'id',
      'project_id',
      'file_url',
      'file_name',
      'file_size',
    ])

    let exists = await projectApplicationFilesModel.getOneWhere({
      equals: {
        id: projectApplicationFileInput.id,
        user_uuid: req.session.user_uuid,
      },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await projectApplicationFilesModel.update(
      projectApplicationFileInput,
    )

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let projectApplicationFileInput = aobj.extract(req.body, ['id'])

    let exists = await projectApplicationFilesModel.getOneWhere({
      equals: {
        id: projectApplicationFileInput.id,
        user_uuid: req.session.user_uuid,
      },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await projectApplicationFilesModel.delete(
      projectApplicationFileInput,
    )

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
