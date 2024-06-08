const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')
const sanitaze = require('../middlewares/sanitaze')

const job_tops_controller = require('../controllers/jobs_top.controller')
const project_tops_controller = require('../controllers/projects_top.controller')
const users_controller = require('../controllers/talents.controller')

router.get('/', job_tops_controller.datatable())

//TODO: jobs

router.post(
  '/job/enable',
  validate({
    ids: 'required|array',
  }),
  sanitaze.preventxss(),
  job_tops_controller.enableTop(),
)

router.post(
  '/job/disable',
  validate({
    ids: 'required|array',
  }),
  sanitaze.preventxss(),
  job_tops_controller.disableTop(),
)

//TODO: projects

router.post(
  '/project/enable',
  validate({
    ids: 'required|array',
  }),
  sanitaze.preventxss(),
  project_tops_controller.enableTop(),
)

router.post(
  '/project/disable',
  validate({
    ids: 'required|array',
  }),
  sanitaze.preventxss(),
  project_tops_controller.disableTop(),
)

//TODO: talents

router.post(
  '/talent/enable',
  validate({
    ids: 'required|array',
  }),
  sanitaze.preventxss(),
  users_controller.enableTop(),
)

router.post(
  '/talent/disable',
  validate({
    ids: 'required|array',
  }),
  sanitaze.preventxss(),
  users_controller.disableTop(),
)

module.exports = router
