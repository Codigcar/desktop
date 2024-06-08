const express = require('express')
const multer = require('multer')
const sanitaze = require('../middlewares/sanitaze')

const router = express.Router()
const upload = multer()

const controller = require('../controllers/opportunities.controller')

router.post(
  '/header',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'placeholder', maxCount: 1 },
  ]),
  controller.createHeaderByDomain(),
)

router.patch(
  '/header',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'placeholder', maxCount: 1 },
  ]),
  controller.updateHeaderByDomain(),
)

router.get('/header', sanitaze.preventxss(), controller.getHeaderByDomain())
router.delete(
  '/header',
  sanitaze.preventxss(),
  controller.deleteHeaderByDomain(),
)

router.get('/filters/jobs', sanitaze.preventxss(), controller.getFiltersJobs())

router.get(
  '/filters/projects',
  sanitaze.preventxss(),
  controller.getFiltersProjects(),
)

router.get(
  '/filters/talents',
  sanitaze.preventxss(),
  controller.getFiltersTalents(),
)

module.exports = router
