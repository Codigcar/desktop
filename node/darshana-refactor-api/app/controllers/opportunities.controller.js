const Sequelize = require('sequelize')
const models = require('../models')
const subtractDays = require('../helpers/dates')
const imagesServices = require('../services/images.services')
const { logger } = require('../helpers/logger')
const { MODELS } = require('../helpers/enums')

const JobModel = models.job
const ProjectModel = models.projects
const WorkModalityModel = models.work_modalities
const CountryModel = models.countries
const JobBoardModel = models.job_board

const JobStatusModel = models.job_status
const BusinessModel = models.business
const UserWorkplaceModel = models.user_workplaces
const UserDetailsModel = models.user_details

const Op = Sequelize.Op

function sortByCount(element1, element2) {
  return element1.count < element2.count
    ? 1
    : element1.count > element2.count
    ? -1
    : 0
}

const uploadImage = async (fileImage) => {
  const response = await imagesServices.upload({
    originalname: fileImage[0].originalname,
    buffer: fileImage[0].buffer,
    mimetype: fileImage[0].mimetype,
  })

  return response
}

module.exports = {
  getFiltersJobs: () => async (req, res, next) => {
    try {
      const { domain } = req.query

      const getJobs = await JobModel.findAll({
        attributes: [
          'country_id',
          'work_modality_id',
          'created_at',
          'job_status_id',
        ],
        where: {
          job_status_id: 1,
          end_date: { [Op.gte]: new Date() },
          ...(domain && { '$business.user_workplace.workplace_name$': domain }),
        },
        include: [
          {
            attributes: ['name', 'visible'],
            model: JobStatusModel,
          },
          {
            attributes: ['user_workplace_id', 'user_uuid'],
            model: BusinessModel,
            include: [
              {
                attributes: ['id', 'user_uuid', 'profile_picture_url'],
                model: UserDetailsModel,
                as: 'owner',
                include: [
                  {
                    attributes: ['industry_id'],
                    model: MODELS.UsersIndustries,
                    include: [
                      {
                        attributes: ['name_en', 'name_es'],
                        model: MODELS.Industries,
                      },
                    ],
                  },
                ],
              },
              {
                attributes: ['workplace_name'],
                model: UserWorkplaceModel,
              },
            ],
          },
        ],
      })

      if (!getJobs.length)
        return res.json({
          status: true,
          countries: [],
          work_modalities: [],
          dates: [],
        })

      const countryCounts = {}
      let countries = []

      //TODO countries
      Array.from(getJobs)
        .map((item) => item.country_id)
        .forEach((element) => {
          if (!element) return
          countryCounts[element] = (countryCounts[element] || 0) + 1
        })

      const CountriesId = Object.keys(countryCounts)

      for (const countryId of CountriesId) {
        const nameCountry = await CountryModel.findOne({
          attributes: ['nombre', 'name'],
          where: { id: countryId },
        })
        countries.push({
          nombre: nameCountry?.nombre ?? null,
          name: nameCountry?.name ?? null,
          count: countryCounts[countryId],
        })
      }

      //TODO Modalidad

      const workModalityCounts = {}
      let workModalities = []

      Array.from(getJobs)
        .map((item) => item.work_modality_id)
        .forEach((element) => {
          if (!element) return
          workModalityCounts[element] = (workModalityCounts[element] || 0) + 1
        })

      const workModalitiesId = Object.keys(workModalityCounts)

      for (const workModalityId of workModalitiesId) {
        const nameWorkModality = await WorkModalityModel.findOne({
          attributes: ['name', 'name_en'],
          where: { id: workModalityId },
        })

        workModalities.push({
          nombre: nameWorkModality?.name ?? null,
          name: nameWorkModality?.dataValues?.name_en ?? null,
          count: workModalityCounts[workModalityId],
        })
      }

      // TODO! fecha de publicacion

      const createdAtCurrent = subtractDays(1)
      const createdAtLastWeek = subtractDays(8)
      const createdAtLast15Days = subtractDays(16)

      const createdAtCurrentCount = await JobModel.count({
        where: {
          created_at: { [Op.eq]: createdAtCurrent },
          job_status_id: 1,
          end_date: { [Op.gte]: new Date() },
        },
      })

      const createdAtLastWeekCount = await JobModel.count({
        where: {
          created_at: { [Op.gte]: createdAtLastWeek },
          job_status_id: 1,
          end_date: { [Op.gte]: new Date() },
        },
      })

      const createdAtLast15DaysCount = await JobModel.count({
        where: {
          created_at: { [Op.gte]: createdAtLast15Days },
          job_status_id: 1,
          end_date: { [Op.gte]: new Date() },
        },
      })

      let dates = [
        {
          nombre: 'Hoy',
          name: 'Today',
          from_date: 1,
          count: createdAtCurrentCount,
          createdAtCurrent,
        },
        {
          nombre: 'Esta semana',
          name: 'Last week',
          from_date: 8,
          count: createdAtLastWeekCount,
          createdAtLastWeek,
        },
        {
          nombre: 'Últimos 15 días',
          name: 'Last 15 days',
          from_date: 16,
          count: createdAtLast15DaysCount,
          createdAtLast15Days,
        },
      ]

      // TODO! Industries
      const industriesCounts = {}
      let industries = []

      Array.from(getJobs)
        .map((item) => item.business.owner.users_industry?.industry_id)
        .forEach((element) => {
          if (!element) return
          industriesCounts[element] = (industriesCounts[element] ?? 0) + 1
        })

      const industriesId = Object.keys(industriesCounts)

      for (const industryId of industriesId) {
        const getIndustryById = await MODELS.Industries.findOne({
          attributes: ['name_en', 'name_es'],
          where: { id: industryId /* required: true */ },
        })

        industries.push({
          nombre: getIndustryById?.name_es ?? null,
          name: getIndustryById?.name_en ?? null,
          count: industriesCounts[industryId],
        })
      }

      // TODO! Sort

      countries = countries.sort(sortByCount)
      workModalities = workModalities.sort(sortByCount)
      dates = dates.sort(sortByCount)
      industries = industries.sort(sortByCount)

      res.json({
        status: true,
        industries,
        countries,
        work_modalities: workModalities,
        dates,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: opportunities.controller.js:237 ~ getFiltersJobs: ~ error:',
        error,
      )
      next(error)
    }
  },

  getFiltersProjects: () => async (req, res, next) => {
    try {
      const { domain } = req.query
      const getProjects = await ProjectModel.findAll({
        attributes: [
          'country_id',
          'work_modality_id',
          'created_at',
          'project_status_id',
        ],
        where: {
          project_status_id: 1,
          end_date: { [Op.gte]: new Date() },
          ...(domain && { '$business.user_workplace.workplace_name$': domain }),
        },
        include: [
          {
            attributes: ['user_workplace_id', 'user_uuid'],
            model: MODELS.Business,
            include: [
              {
                attributes: ['id', 'user_uuid', 'profile_picture_url'],
                model: MODELS.UserDetails,
                as: 'owner',
                include: [
                  {
                    attributes: ['industry_id'],
                    model: MODELS.UsersIndustries,
                    include: [
                      {
                        attributes: ['name_en', 'name_es'],
                        model: MODELS.Industries,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })

      if (!getProjects.length)
        return res.json({
          status: true,
          countries: [],
          work_modalities: [],
          dates: [],
        })

      const countryCounts = {}
      let countries = []

      // countries
      Array.from(getProjects)
        .map((item) => item.country_id)
        .forEach((element) => {
          if (!element) return
          countryCounts[element] = (countryCounts[element] || 0) + 1
        })

      const CountriesId = Object.keys(countryCounts)

      for (const countryId of CountriesId) {
        const nameCountry = await CountryModel.findOne({
          attributes: ['nombre', 'name'],
          where: { id: countryId },
        })
        countries.push({
          nombre: nameCountry?.nombre ?? null,
          name: nameCountry?.name ?? null,
          count: countryCounts[countryId],
        })
      }

      //TODO fecha de publicacion

      const createdAtCurrent = subtractDays(1)
      const createdAtLastWeek = subtractDays(8)
      const createdAtLast15Days = subtractDays(16)

      const createdAtCurrentCount = await ProjectModel.count({
        where: {
          created_at: { [Op.eq]: createdAtCurrent },
          project_status_id: 1,
          end_date: { [Op.gte]: new Date() },
        },
      })

      const createdAtLastWeekCount = await ProjectModel.count({
        where: {
          created_at: { [Op.gte]: createdAtLastWeek },
          project_status_id: 1,
          end_date: { [Op.gte]: new Date() },
        },
      })

      const createdAtLast15DaysCount = await ProjectModel.count({
        where: {
          created_at: { [Op.gte]: createdAtLast15Days },
          project_status_id: 1,
          end_date: { [Op.gte]: new Date() },
        },
      })

      let dates = [
        {
          nombre: 'Hoy',
          name: 'Today',
          from_date: 1,
          count: createdAtCurrentCount,
          createdAtCurrent,
        },
        {
          nombre: 'Esta semana',
          name: 'Last week',
          from_date: 8,
          count: createdAtLastWeekCount,
          createdAtLastWeek,
        },
        {
          nombre: 'Últimos 15 días',
          name: 'Last 15 days',
          from_date: 16,
          count: createdAtLast15DaysCount,
          createdAtLast15Days,
        },
      ]

      // TODO! Industries
      const industriesCounts = {}
      let industries = []

      Array.from(getProjects)
        .map((item) => item.business.owner.users_industry?.industry_id)
        .forEach((element) => {
          if (!element) return
          industriesCounts[element] = (industriesCounts[element] ?? 0) + 1
        })

      const industriesId = Object.keys(industriesCounts)

      for (const industryId of industriesId) {
        const getIndustryById = await MODELS.Industries.findOne({
          attributes: ['name_en', 'name_es'],
          where: { id: industryId /* required: true */ },
        })

        industries.push({
          nombre: getIndustryById?.name_es ?? null,
          name: getIndustryById?.name_en ?? null,
          count: industriesCounts[industryId],
        })
      }

      countries = countries.sort(sortByCount)
      dates = dates.sort(sortByCount)
      industries = industries.sort(sortByCount)

      res.json({
        status: true,
        industries,
        countries,
        dates,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: opportunities.controller.js:399 ~ getFiltersProjects: ~ error:',
        error,
      )
      next(error)
    }
  },

  createHeaderByDomain: () => async (req, res, next) => {
    const { logo, banner, placeholder } = req.files
    const { domain } = req.body

    try {
      const getJobBoard = await JobBoardModel.findOne({
        where: { domain, deleted_at: null },
      })

      if (getJobBoard)
        return res.status(400).json({
          status: false,
          message: 'Domain already exists',
          message_es: 'Dominio no válido, ya se encuentra registrado',
        })

      const logoResp = await uploadImage(logo)
      if (!logoResp.status) return res.status(500).json(logoResp)

      const bannerResp = await uploadImage(banner)
      if (!bannerResp.status) return res.status(500).json(bannerResp)

      const placeholderResp = await uploadImage(placeholder)
      if (!placeholderResp.status) return res.status(500).json(placeholderResp)

      const jobBoard = {
        logo: logoResp.data,
        banner: bannerResp.data,
        placeholder: placeholderResp.data,
        domain: domain,
      }

      await JobBoardModel.create(jobBoard)

      res.status(201).json({
        status: true,
        message: 'Job board created successfully',
        message_es: 'Bolsa de trabajo creado',
        data: jobBoard,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: opportunities.controller.js:340 ~ createHeaderByDomain: ~ error:',
        error,
      )
      next(error)
    }
  },

  updateHeaderByDomain: () => async (req, res, next) => {
    const { logo = null, banner = null, placeholder = null } = req.files
    const { domain } = req.query

    let jobBoard = {}

    try {
      const getJobBoard = await JobBoardModel.findOne({
        where: { domain, deleted_at: null },
      })

      if (!getJobBoard)
        return res.status(400).json({
          status: false,
          message: 'Domain not found',
          message_es: 'Dominio no encontrado',
        })

      if (logo) {
        const logoResp = await uploadImage(logo)
        if (!logoResp.status) return res.status(500).json(logoResp)
        jobBoard.logo = logoResp.data
      }

      if (banner) {
        const bannerResp = await uploadImage(banner)
        if (!bannerResp.status) return res.status(500).json(bannerResp)
        jobBoard.banner = bannerResp.data
      }

      if (placeholder) {
        const placeholderResp = await uploadImage(placeholder)
        if (!placeholderResp.status)
          return res.status(500).json(placeholderResp)
        jobBoard.placeholder = placeholderResp.data
      }

      await JobBoardModel.update(jobBoard, { where: { domain } })

      const data = await JobBoardModel.findOne({
        attributes: ['logo', 'banner', 'domain', 'placeholder'],
        where: { domain },
      })

      res.json({
        status: true,
        message: 'Job board updated successfully',
        message_es: 'Bolsa de trabajo actualizado',
        data,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: opportunities.controller.js:389 ~ updateHeaderByDomain: ~ error:',
        error,
      )
      next(error)
    }
  },

  deleteHeaderByDomain: () => async (req, res, next) => {
    const { domain } = req.query

    try {
      const getJobBoard = await JobBoardModel.findOne({
        attributes: ['logo', 'banner', 'domain', 'placeholder'],
        where: { domain, deleted_at: null },
      })

      if (!getJobBoard)
        return res.status(400).json({
          status: false,
          message: 'Domain not found',
          message_es: 'Dominio no encontrado',
        })

      await JobBoardModel.update(
        { deletedAt: new Date() },
        { where: { domain } },
      )

      res.json({
        status: true,
        message: 'Job board deleted',
        message_es: 'Bolsa de trabajo eliminado',
        data: getJobBoard,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: opportunities.controller.js:389 ~ updateHeaderByDomain: ~ error:',
        error,
      )
      next(error)
    }
  },

  getHeaderByDomain: () => async (req, res, next) => {
    const { domain } = req.query

    if (!domain) {
      const getAll = await JobBoardModel.findAll({
        attributes: ['logo', 'banner', 'domain', 'placeholder'],
      })
      return res.json({ status: true, data: getAll })
    }

    try {
      const getJobBoardByName = await JobBoardModel.findOne({
        attributes: ['logo', 'banner', 'domain', 'placeholder'],
        where: { domain, deleted_at: null },
      })

      if (!getJobBoardByName)
        return res.status(404).json({
          status: false,
          message: 'Domain name not found',
          message_es: 'Dominio no encontrado',
        })

      res.json({
        status: true,
        message: 'Domain found successfully',
        message_es: 'Domain encontrado',
        data: getJobBoardByName,
      })
    } catch (error) {
      next(error)
    }
  },

  getFiltersTalents: () => async (req, res, next) => {
    try {
      const getUsers = await MODELS.UserDetails.findAll({
        attributes: ['user_uuid'],
        where: { is_talent: 1 },
        include: [
          {
            attributes: ['id', 'name', 'required'],
            model: MODELS.Skills,
          },
          {
            attributes: ['id', 'name_en', 'name_es'],
            model: MODELS.Languages,
          },
          {
            attributes: ['id', 'name'],
            model: MODELS.RolesInterest,
          },
        ],
      })

      // TODO skills

      const skillsCount = {}
      const skillsList = []
      const usersSkills = Array.from(getUsers).map((user) => user.skills)

      for (const item of usersSkills) {
        for (const object of item) {
          if (!object.required) continue
          const id = object.id
          if (skillsCount[id]) {
            skillsCount[id]++
          } else {
            skillsCount[id] = 1
          }
        }
      }

      for (const key in skillsCount) {
        const getSkill = await MODELS.Skills.findOne({
          attributes: ['id', 'name', 'required'],
          where: { id: key },
        })
        const element = skillsCount[key]
        skillsList.push({
          ...getSkill.dataValues,
          count: element,
        })
      }

      // TODO languages

      const languagesCount = {}
      const languagesList = []
      const usersLanguages = Array.from(getUsers).map((user) => user.languages)

      for (const item of usersLanguages) {
        for (const object of item) {
          const id = object.id
          if (languagesCount[id]) {
            languagesCount[id]++
          } else {
            languagesCount[id] = 1
          }
        }
      }

      for (const key in languagesCount) {
        const getLanguage = await MODELS.Languages.findOne({
          attributes: ['id', 'name_en', 'name_es'],
          where: { id: key },
        })
        const element = languagesCount[key]
        languagesList.push({
          ...getLanguage.dataValues,
          count: element,
        })
      }

      // TODO roles interest

      const rolesInterestCount = {}
      const rolesInterestList = []
      const usersRolesInterest = Array.from(getUsers).map(
        (user) => user.roles_interests,
      )

      for (const item of usersRolesInterest) {
        for (const object of item) {
          const id = object.id
          if (rolesInterestCount[id]) {
            rolesInterestCount[id]++
          } else {
            rolesInterestCount[id] = 1
          }
        }
      }

      for (const key in rolesInterestCount) {
        const getLanguage = await MODELS.RolesInterest.findOne({
          attributes: ['id', 'name'],
          where: { id: key },
        })
        const element = rolesInterestCount[key]
        rolesInterestList.push({
          ...getLanguage.dataValues,
          count: element,
        })
      }

      res.json({
        status: true,
        skills: skillsList,
        languages: languagesList,
        roles_interest: rolesInterestList,
        // data: getUsers,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: opportunities.controller.js:646 ~ getFiltersTalents: ~ error:',
        error,
      )
      next(error)
    }
  },
}
