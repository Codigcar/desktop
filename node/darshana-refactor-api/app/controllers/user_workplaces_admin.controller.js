const aobj = require('aobj')
const userWorkplacesModel = require('../models/user_workplaces')
const businessModel = require('../models/business')
const workplaces = require('../models/workplaces')
const userDetailsModel = require('../models/user_details')
const { typeMessages } = require('../helpers/enums')

module.exports = {
  create: () => async (req, res, next) => {
    try {
      const { data: bodyList } = req.body
      for (const bodyItem of bodyList) {
        let workplaceInput = aobj.extract(bodyItem, [
          'user_uuid',
          'start_date',
          'end_date',
          'description',
          'work_here',
          'position',
          'workplace_name',
          'enable_business',
          'verify_status_id',
        ])

        const enableBusiness = workplaceInput.enable_business

        if (workplaceInput.work_here) {
          delete workplaceInput.end_date
        }

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
          await businessModel.create({
            user_workplace_id: data.id,
            user_uuid: data.user_uuid,
          })
          const userDetail = await userDetailsModel.getByUuid(
            workplaceInput.user_uuid,
          )
          if (userDetail.is_talent) {
            await userDetailsModel.update({ ...userDetail, is_talent: false })
          }
        }
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
