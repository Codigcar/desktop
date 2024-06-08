const aobj = require('aobj')
const timerModel = require('../models/timer')
const projectsModel = require('../models/projects')
const topicsModel = require('../models/topics')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')

async function updateTimersOfUser(user_uuid) {
  let timers = await timerModel.getAllWhere({ equals: { user_uuid } })
  for (const timer of timers) {
    if (timer.state !== 'stopped') {
      if (new Date().getTime() >= new Date(timer.stop_at).getTime()) {
        await timerModel.update({ id: timer.id, state: 'stopped' })
      }
    }
  }
}

module.exports = {
  getTimers: () => async (req, res) => {
    await updateTimersOfUser(req.session.user_uuid)

    let acumulated = await timerModel.getAllWhere({
      equals: { state: 'stopped', user_uuid: req.session.user_uuid },
    })

    for (const i in acumulated) {
      acumulated[i].project = await projectsModel.getById(
        acumulated[i].project_id,
      )
      if (acumulated[i].project) {
        acumulated[i].project.topic = (
          await topicsModel.getById(acumulated[i].project.topic_id)
        ).name
      }
    }

    if (req.query.project_id) {
      acumulated = acumulated.filter(
        (v) => v.project_id == parseInt(req.query.project_id + ''),
      )
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: acumulated,
    })
  },

  getTimer: () => async (req, res) => {
    await updateTimersOfUser(req.session.user_uuid)

    let response = await timerModel.getAllWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    let t = response.find((v) => v.state == 'running' || v.state == 'paused')

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: t,
    })
  },

  start: () => async (req, res) => {
    await updateTimersOfUser(req.session.user_uuid)

    let timerInput = aobj.extract(req.body, ['project_id'])

    if (!req.body.time) {
      return res.json({
        status: false,
        message: 'Invalid time amount',
        message_es: 'Tiempo invalido',
      })
    }

    let p = await projectsModel.getById(timerInput.project_id)

    if (!p) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    let currentTimer = await timerModel.getOneWhere({
      equals: { state: 'running', user_uuid: req.session.user_uuid },
    })

    if (currentTimer) {
      return res.json({
        status: false,
        message: 'Timer already running',
        message_es: 'Tiempo ya esta corriendo',
      })
    }

    currentTimer = await timerModel.getOneWhere({
      equals: { state: 'paused', user_uuid: req.session.user_uuid },
    })

    if (currentTimer) {
      return res.json({
        status: false,
        message: 'Timer is paused',
        message_es: 'Tiempo esta pausado',
      })
    }

    timerInput.user_uuid = req.session.user_uuid
    timerInput.time = parseInt(req.body.time) * 60000
    timerInput.stop_at = new Date(Date.now() + timerInput.time)
    timerInput.state = 'running'

    let data = await timerModel.create(timerInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  stop: () => async (req, res) => {
    await updateTimersOfUser(req.session.user_uuid)

    let currentTimer = await timerModel.getOneWhere({
      equals: { id: req.body.id, user_uuid: req.session.user_uuid },
    })

    if (!currentTimer) {
      return res.json({
        status: false,
        message: typeErrorMessages.TIMER_NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    if (currentTimer.state == 'stopped') {
      return res.json({
        status: false,
        message: 'Timer already stopped',
        message_es: 'Tiempo ya se detuvo',
      })
    }

    let timerInput = {
      id: currentTimer.id,
      stop_at: new Date(),
      state: 'stopped',
    }

    let data = await timerModel.update(timerInput)

    res.json({
      status: true,
      message: 'Timer stopped',
      message_es: 'Tiempo detenido',
      data: data,
    })
  },

  pause: () => async (req, res) => {
    await updateTimersOfUser(req.session.user_uuid)

    let currentTimer = await timerModel.getOneWhere({
      equals: { id: req.body.id, user_uuid: req.session.user_uuid },
    })

    if (!currentTimer) {
      return res.json({
        status: false,
        message: typeErrorMessages.TIMER_NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    if (currentTimer.state !== 'running') {
      return res.json({
        status: false,
        message: 'Timer is not running',
        message_es: 'Tiempo no esta corriendo',
      })
    }

    let timerInput = {
      id: currentTimer.id,
      paused_at: new Date(),
      state: 'paused',
    }

    let data = await timerModel.update(timerInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  resume: () => async (req, res) => {
    let currentTimer = await timerModel.getOneWhere({
      equals: { id: req.body.id, user_uuid: req.session.user_uuid },
    })

    if (!currentTimer) {
      return res.json({
        status: false,
        message: typeErrorMessages.TIMER_NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    if (currentTimer.state !== 'paused') {
      return res.json({
        status: false,
        message: 'Timer is not paused',
        message_es: 'Tiempo no esta pausado',
      })
    }

    let d =
      new Date(currentTimer.stop_at).getTime() -
      new Date(currentTimer.paused_at).getTime()

    let timerInput = {
      id: currentTimer.id,
      stop_at: new Date(
        Date.now() + currentTimer.time - (currentTimer.time - d),
      ),
      paused_at: null,
      state: 'running',
    }

    let data = await timerModel.update(timerInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
