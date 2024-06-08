module.exports = {
  datatable: () => async (req: any, res: any) => {
    const { MODELS } = require('../helpers/enums')
    let { page, length, order = [], ...where } = req.query

    const { column = null, dir = null } = order[0] ?? []
    const limit = parseInt(length) || 999999
    let pageCurrent = parseInt(page)

    const whereConditionl = {
      ...(where && where),
    }

    const options = {
      order: [[column ?? 'id', dir ?? 'desc']],
      offset: pageCurrent ? --pageCurrent * limit : undefined,
      limit,
      include: [
        {
          attributes: ['full_name'],
          model: MODELS.UserDetails,
        },
      ],
      where: whereConditionl,
    }

    const count = await MODELS.ChatGpt.count(options)
    const last_page = Math.ceil(count / limit)
    const getChatGpts = await MODELS.ChatGpt.findAll({
      attributes: ['question', 'createdAt'],
      ...options,
    })
    return res.json({
      status: true,
      meta: {
        last_page: last_page,
      },
      data: getChatGpts,
    })
  },

  create: () => async (req: any, res: any) => {
    const { MODELS } = require('../helpers/enums')
    const { user_uuid, question } = req.body as {
      user_uuid: string
      question: string
    }
    const response = await MODELS.ChatGpt.create({
      user_uuid,
      question,
    })
    res.json({ status: true, data: response })
  },

  queryPrompt: () => async (req: any, res: any, next: any) => {
    const { Configuration, OpenAIApi } = require('openai')
    const { MODELS } = require('../helpers/enums')
    const { logger } = require('../helpers/logger.js')

    try {
      const { user_uuid, prompt } = req.body as {
        user_uuid: string
        prompt: string
      }
      const configuration = new Configuration({
        apiKey: process.env.OPENAI,
      })
      const openai = new OpenAIApi(configuration)
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        max_tokens: 1000,
      })

      await MODELS.ChatGpt.create({
        user_uuid,
        question: prompt,
      })

      return res.json({ status: true, data: response.data.choices[0].text })
    } catch (error) {
      logger.error(
        '🚀 ~ file: chat_gpt.controller.ts:83 ~ queryPrompt: ~ error:',
        JSON.stringify(error),
      )
      next(error)
    }
  },
}
