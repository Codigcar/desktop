import amqp, { Channel } from 'amqplib'
import amqpConnManager from 'amqp-connection-manager'

import { MetaRepositoryImpl } from './infrastructure/repositories/meta.repository.impl'
import { userQuestionsRepositoryImpl } from './infrastructure/repositories/user_questions.repository.impl'
import { MetaServices } from './application/meta.services'
import { MessageStatus } from './utils/interfaces/enums'
import { UserQuestionsServices } from './application/user_questions.services'
import { UserServices } from './application/user.services'
import { UserMessagesServices } from './application/user_messages.services'
import { CronJobServices } from './application/cronjob.services'
import IgnoreStatus from './utils/ignoreStatus/ignoreStatus'
import logger from './utils/logger'

const CHANNEL = 'messages-wstp1'
// const CHANNEL_FROMWEBHOOK = 'from-webhook-local'
// const CHANNEL_SEND_TURNIO = 'send-turnio-local'
const CONNECTION_RABBIT = `amqps://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_DOMAIN}:5671`

// Función para crear una nueva conexión
async function createNewConnection() {
  return await amqpConnManager.connect([CONNECTION_RABBIT], {
    reconnectTimeInSeconds: 5,
    heartbeatIntervalInSeconds: 5,
  })
}

export default class RabbitMQ {
  private channel: Channel = {} as Channel
  private channel2: Channel = {} as Channel
  static instance: RabbitMQ
  private metaRepository: MetaRepositoryImpl
  private userQuestionRepository: userQuestionsRepositoryImpl
  private metaServices: MetaServices

  private userQuestionsServices: UserQuestionsServices
  private userServices: UserServices
  private userMessageServices: UserMessagesServices
  private cronjobServices: CronJobServices

  static getInstance() {
    if (!this.instance) {
      this.instance = new RabbitMQ()
    }
    return this.instance
  }

  constructor() {
    this.metaRepository = new MetaRepositoryImpl()
    this.userQuestionRepository = userQuestionsRepositoryImpl.getInstance()
    this.metaServices = MetaServices.getInstance()
    this.userQuestionsServices = UserQuestionsServices.getInstance()
    this.userServices = UserServices.getInstance()
    this.userMessageServices = UserMessagesServices.getInstance()
    this.cronjobServices = CronJobServices.getInstance()
    // this.initChannel()
    this.receive()
    this.receiveTURNIO()
  }

  async sendTURNIO({ message }: { message: any }) {
    let connection = await createNewConnection()

    // Manejar eventos de conexión
    connection.on('connect', function () {
      logger.info('[RABBITMQ2 - sendTURNIO] Conexión establecida con el servidor RabbitMQ.')
    })
    
    connection.on('blocked', function (params) {
      logger.error('[RABBITMQ2 - sendTURNIO] blocked RabbitMQ.', JSON.stringify(params.reason))
    })

    connection.on('connectFailed', function (params) {
      logger.error('[RABBITMQ2 - sendTURNIO] connectFailed RabbitMQ.', JSON.stringify(params.err))
      logger.error('[RABBITMQ2 - sendTURNIO] connectFailed RabbitMQ.', JSON.stringify(params.url))
      // Reintentar la conexión en caso de desconexión
      setTimeout(async() => {
        console.log('Reintentando la conexión a RabbitMQ...');
        connection = await createNewConnection();
      }, 5000); // Reintentar la conexión después de 5 segundos (ajusta este valor según sea necesario)
    })

    connection.on('connect', function () {
      logger.info('[RABBITMQ2 - sendTURNIO] Conexión establecida con el servidor RabbitMQ.')
    })

    connection.on('disconnect', function (params) {
      logger.error('[RABBITMQ2 - sendTURNIO] Conexión perdida con el servidor RabbitMQ.', JSON.stringify(params.err))
    })

    const channelWrapper = connection.createChannel({
      json: true,
      setup: function (channel: any) {
        return channel.assertQueue(process.env.CHANNEL_SEND_TURNIO, { durable: true })
      },
    })

    channelWrapper.sendToQueue(process.env.CHANNEL_SEND_TURNIO!, message)
    .then(function() {
        logger.debug(`[RABBITMQ2] Message sent: ${JSON.stringify(message)}`);
        connection.close()
        return;
    })
    .then(function() {
        // return sendMessage();
    }).catch(function(err: any) {
        logger.error("[RABBITMQ2] Message was rejected:", JSON.stringify(err.stack));
        channelWrapper.close();
        connection.close();
    });
  }

  async receiveTURNIO() {
    // const connectionManager = await amqpConnManager.connect(CONNECTION_RABBIT)
    let connectionManager = await createNewConnection()
    // Manejar eventos de conexión
    connectionManager.on('connect', function () {
      logger.info('[RABBITMQ] - receiveTURNIO Conexión establecida con el servidor RabbitMQ.')
    })

    connectionManager.on('blocked', function (params) {
      logger.error('[RABBITMQ - receiveTURNIO] blocked RabbitMQ.', JSON.stringify(params.reason))
    })

    connectionManager.on('connectFailed', function (params) {
      logger.error('[RABBITMQ - receiveTURNIO] connectFailed RabbitMQ.', JSON.stringify(params.err))
      logger.error('[RABBITMQ - receiveTURNIO] connectFailed RabbitMQ.', JSON.stringify(params.url))

      // Reintentar la conexión en caso de desconexión
      setTimeout(async() => {
        console.log('Reintentando la conexión a RabbitMQ...');
        connectionManager = await createNewConnection();
      }, 5000); // Reintentar la conexión después de 5 segundos (ajusta este valor según sea necesario)
    })

    connectionManager.on('disconnect', function (params) {
      logger.info('[RABBITMQ - receiveTURNIO] Conexión perdida con el servidor RabbitMQ.', JSON.stringify(params.err))
    })

    // Establecer manejador de eventos de error en la conexión
    connectionManager.on('error', (err) => {
      logger.info('[RABBITMQ - receiveTURNIO] Error en la conexión a RabbitMQ:', err)
    })

    const onMessage4 = async(messageChannel:any) => {
      try {
        const body = JSON.parse(messageChannel!.content)
        const { mode, waId, getNextQuestionId } = body
        const ignoreStatus = IgnoreStatus.getInstance()
        const messageSended = await this.metaServices.sendMessageByType(
          body,
        )
        
        if (mode) {
          if(mode === 'ignoreStatusOfMessage') {
            ignoreStatus.add(waId, messageSended?.messages[0]?.id ?? '')
            channel4.ack(messageChannel)
            return
          }


          await this.userQuestionRepository.register({
            wa_id: waId,
            question_id: getNextQuestionId,
            message_id: messageSended?.messages[0]?.id,
            status: 'X',
            has_answer: false,
          })
        }
        channel4.ack(messageChannel)
      } catch (error:any) {
        logger.error("🚀 -----------------------------------------------------------------🚀")
        logger.error("🚀 ~ file: rabbitmq.ts:120 ~ RabbitMQ ~ onMessage4 ~ error:", JSON.stringify(error.response.data))
        logger.error("🚀 -----------------------------------------------------------------🚀")
        channel4.nack(messageChannel)
      }
    }
    

    const channel4 = connectionManager.createChannel({
      json: true,
      setup: function (channel: any) {
        return Promise.all([
          channel.assertQueue(process.env.CHANNEL_SEND_TURNIO, {durable: true}),
          // channel.prefetch(1),
          channel.consume(process.env.CHANNEL_SEND_TURNIO, onMessage4, { noAck: false,})
      ]);
      },
    })

    channel4.waitForConnect()
    .then(function() {
        logger.debug("[RABBITMQ2] Listening for messages");
    });
  }

  async send({ message }: { message: any }) {
    let connection = await createNewConnection()

    // Manejar eventos de conexión
    connection.on('connect', function () {
      logger.debug('[RABBITMQ] Conexión establecida con el servidor RabbitMQ.')
    })

    connection.on('blocked', function (params) {
      logger.error('[RABBITMQ] blocked RabbitMQ.', JSON.stringify(params.reason))
    })

    connection.on('connectFailed', function (params) {
      logger.error('[RABBITMQ] 1 connectFailed RabbitMQ.', JSON.stringify(params))
      logger.error('[RABBITMQ] 2 connectFailed RabbitMQ.', JSON.stringify(params.url))
      setTimeout(async() => {
        logger.info('1 Reintentando la conexión a RabbitMQ...');
        connection = await createNewConnection();
        logger.info('2 Reintentando la conexión a RabbitMQ...');
      }, 5000);
    })

    connection.on('disconnect', function (params) {
      logger.error('[RABBITMQ] Conexión perdida con el servidor RabbitMQ.', JSON.stringify(params.err))
    })

    // Obtener un canal del administrador de conexiones
    // const channelWrapper = await connectionManager.createChannel();
    const channelWrapper = connection.createChannel({
      json: true,
      setup: function (channel: any) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        // Note that `this` here is the channelWrapper instance.
        return channel.assertQueue(process.env.CHANNEL_FROMWEBHOOK, { durable: true })
      },
    }) 

    channelWrapper.sendToQueue(process.env.CHANNEL_FROMWEBHOOK!, message)
    .then(function() {
        logger.debug(`[RABBITMQ] Message sent: ${JSON.stringify(message)}`);
        connection.close()
        return;
    })
    .then(function() {
        // return sendMessage();
    }).catch(function(err: any) {
        logger.debug("[RABBITMQ] Message was rejected:", JSON.stringify(err.stack));
        channelWrapper.close();
        connection.close();
    });
  }

  async receive() {
    let connectionManager = await createNewConnection()

    // Manejar eventos de conexión
    connectionManager.on('connect', function () {
      logger.debug('[RABBITMQ - receive] Conexión establecida con el servidor RabbitMQ.')
    })

    connectionManager.on('blocked', function (params) {
      logger.error('[RABBITMQ - receive] blocked RabbitMQ.', JSON.stringify(params.reason))
    })

    connectionManager.on('connectFailed', function (params) {
      logger.error('[RABBITMQ - receive] connectFailed RabbitMQ.', JSON.stringify(params.err))
      logger.error('[RABBITMQ - receive] connectFailed RabbitMQ.', JSON.stringify(params.url))
      setTimeout(async() => {
        console.log('Reintentando la conexión a RabbitMQ...');
        connectionManager = await createNewConnection();
      }, 5000);
    })

    connectionManager.on('disconnect', function (params) {
      logger.error('[RABBITMQ - receive] Conexión perdida con el servidor RabbitMQ.', JSON.stringify(params.err))
    })

    // Establecer manejador de eventos de error en la conexión
    connectionManager.on('error', (err) => {
      console.error('[RABBITMQ - receive] Error en la conexión a RabbitMQ:', JSON.stringify(err))
    })

    const onMessage = async (messageChannel: any) => {
      logger.debug('🚀 [CONSUME] ******************************************************************************🚀')
      logger.debug('🚀 ~ file: rabbitmq.ts:124 ~ this.channel.consume ~ message!.content:',messageChannel.content.toString())
      logger.debug('🚀 ~ file: rabbitmq.ts:125 ~ this.channel.consume ~ message!.content:',JSON.parse(messageChannel.content.toString()))
      logger.debug('🚀 --------------------------------------------------------------------------------------🚀')

      if (messageChannel) {
        try {
          // const getInfo = JSON.parse(messageChannel!.content)
          const getInfo = JSON.parse(messageChannel!.content)
          const { statuses, messages, contacts } = getInfo

          if (statuses) {
            // TODO! -> [status] BOT -> USER
            const { id, status, message, recipient_id: waId } = statuses[0]
            // const { recipient_id: waId } = message
            logger.debug(
              '🚀1 --------------------------------------------------------------------🚀',
            )

            const getUserQuestion = await this.metaServices.getUserQuestionByMessageId({
              waId,
              messageId: id,
            })
            

            logger.debug("🚀 ----------------------------------------------------------------------------------------------------🚀")
            logger.debug("🚀 ~ file: rabbitmq.ts:233 ~ RabbitMQ ~ onMessage ~ getUserQuestion?.status:", getUserQuestion?.status)
            logger.debug("🚀 ----------------------------------------------------------------------------------------------------🚀")
            if(getUserQuestion?.status === MessageStatus.DELIVERED || getUserQuestion?.status === MessageStatus.READ) {
              logger.debug("🚀1.5 ------------------------------------------------------------------------------------🚀")
              channel3.ack(messageChannel)
              return
            }

            // TODO -> actualizar status de la pregunta enviada
            const getUserQuestionDB: any = await this.metaServices.updateUserQuestionSended({
                waId,
                messageId: id,
                updateObject: { status },
              })

            logger.debug('🚀2 --------------------------------------------------------------------🚀')
            // TODO -> ya le llegó el mensaje el usuario
            // if (status === MessageStatus.DELIVERED) {
              logger.debug('3 --------------------------------------------------------------------🚀')
              // TODO -> cuando es un mensaje enviado desde el BOT al USER, pero este se genera cuando el USER contesta con una respuesta correcta
              if (!getUserQuestionDB) {
                logger.debug('3.5 --------------------------------------------------------------------🚀')
                const getLastUserQuestionDB: any = await this.userQuestionsServices.getLastQuestionByWaId(waId)
                logger.debug("🚀 ------------------------------------------------------------------------------------------------🚀")
                logger.debug("🚀 ~ file: rabbitmq.ts:180 ~ RabbitMQ ~ onMessage ~ getLastUserQuestionDB:", JSON.stringify(getLastUserQuestionDB))
                logger.debug("🚀 ------------------------------------------------------------------------------------------------🚀")
                
                if (!getLastUserQuestionDB?.has_answer) {
                  logger.debug('3.7 --------------------------------------------------------------------🚀',)
                  channel3.ack(messageChannel)
                  return
                }
                logger.debug('4 --------------------------------------------------------------------🚀')

                await this.metaServices.sendNextQuestion({ waId })
                channel3.ack(messageChannel)
                logger.debug('5 --------------------------------------------------------------------🚀')
                return
              }
              logger.debug('6 --------------------------------------------------------------------🚀')

              if (getUserQuestionDB.has_answer) {
                logger.debug('7 --------------------------------------------------------------------🚀')
                channel3.ack(messageChannel)
                return
              }

              // TODO -> esperar respuesta del usuario
              const { is_waiting_answer } = getUserQuestionDB.question_id._doc
              logger.debug('8 --------------------------------------------------------------------🚀')
              if (is_waiting_answer) {
                logger.debug('9 --------------------------------------------------------------------🚀')
                channel3.ack(messageChannel)
                logger.debug('10 --------------------------------------------------------------------🚀')
                return
              }
              logger.debug('11 --------------------------------------------------------------------🚀')

              //TODO -> enviar la next question
              await this.metaServices.sendNextQuestion({ waId })
              channel3.ack(messageChannel)
              logger.debug('12 --------------------------------------------------------------------🚀')
              return
            // }
              logger.debug('14 --------------------------------------------------------------------🚀')
          }
          logger.debug('[Intermedio] --------------------------------------------------------------------🚀')

          if (contacts) {
            logger.debug('21 --------------------------------------------------------------------🚀')
            // TODO! [BOT <- USER]
            const { wa_id } = contacts[0]
            const { text, interactive, audio, image, button } = messages[0]
            const voice = audio?.voice

            // if (text && text.body.toLowerCase() === 'consulta') {
            //   logger.debug("22 --------------------------------------------------------------------🚀")
            //   await this.metaServices.sendConsoleContact({ waId: wa_id })
            //   logger.debug("23 --------------------------------------------------------------------🚀")
            // }

            if (text || interactive || voice || image || button) {
              logger.debug('24 --------------------------------------------------------------------🚀')
              // TODO -> obtiene la ultima pregunta hecha al usuario
              const getLastUserQuestion: any =
                await this.userQuestionsServices.getLastQuestionByWaId(wa_id)
              logger.debug('25 --------------------------------------------------------------------🚀')

              if (!getLastUserQuestion) {
                logger.debug('26 --------------------------------------------------------------------🚀')
                channel3.ack(messageChannel)
                logger.debug('27 --------------------------------------------------------------------🚀')
                return
              }
              logger.debug('28 --------------------------------------------------------------------🚀')

              const {
                is_waiting_answer,
                answers,
                category,
                idx,
                value: from_question,
              } = getLastUserQuestion.question_id._doc

              logger.debug('28 --------------------------------------------------------------------🚀',)
              // TODO -> si la pregunta no espera una respuesta, manda la siguiente pregunta
              if (!is_waiting_answer) {
                logger.debug('29 --------------------------------------------------------------------🚀')
                channel3.ack(messageChannel)
                logger.debug('30 --------------------------------------------------------------------🚀')
                return
              }
              logger.debug('31 --------------------------------------------------------------------🚀')

              if (category === 'question_voice' || category === 'question_voice_or_image') {
                logger.debug('32 --------------------------------------------------------------------🚀')
                const isAnswerCorrect = category === 'question_voice' ? Boolean(voice) : Boolean(voice ?? image)

                // TODO -> registrar respuesta en BD
                if (isAnswerCorrect) {
                  logger.debug('33 --------------------------------------------------------------------🚀')

                  await this.userMessageServices.findOneAndUpdate({
                    userQuestionId: getLastUserQuestion._id,
                    waId: wa_id,
                    message: JSON.stringify(voice),
                    idx: idx,
                    fromQuestion: from_question?.body,
                    module: getLastUserQuestion.question_id._doc.module,
                    day: getLastUserQuestion.question_id._doc.day,
                  })
                  logger.debug('34 --------------------------------------------------------------------🚀',)
                }

                logger.debug('35 --------------------------------------------------------------------🚀')
                // TODO -> enviar mensaje de respuesta o enviar de nuevo la última pregunta
                const questionToSent = isAnswerCorrect
                  ? answers[0]
                  : getLastUserQuestion.question_id._doc

                logger.debug('36 --------------------------------------------------------------------🚀')
                if (questionToSent.value) {
                  await this.metaServices.sendMessage({
                    waId: wa_id,
                    body: questionToSent.value.body,
                    type: questionToSent.value.type,
                    buttons: questionToSent.value.buttons,
                  })
                  logger.debug('38 --------------------------------------------------------------------🚀')
                } else {
                  logger.debug('39 --------------------------------------------------------------------🚀')
                  await this.metaServices.sendNextQuestion({ waId: wa_id })
                  logger.debug('40 --------------------------------------------------------------------🚀')
                }

                // TODO...

                logger.debug('41 --------------------------------------------------------------------🚀')
                if (!isAnswerCorrect) {
                  logger.debug('42 --------------------------------------------------------------------🚀')
                  channel3.ack(messageChannel)
                  logger.debug('43 --------------------------------------------------------------------🚀')
                  return
                }

                logger.debug('44 --------------------------------------------------------------------🚀')
                // TODO -> actualizar como has_answer `true`, indica que el usuario ya respondió correctamente a la pregunta que se le envió
                await this.metaServices.updateUserQuestionSended({
                  waId: wa_id,
                  messageId: getLastUserQuestion.message_id,
                  updateObject: { has_answer: true },
                })
                logger.debug('45 --------------------------------------------------------------------🚀')

                // TODO -> suma al score
                if (answers[0]?.score > 0) {
                  logger.debug('46 --------------------------------------------------------------------🚀')
                  await this.userServices.updateScore({
                    waId: wa_id,
                    score: answers[0]?.score,
                  })
                  logger.debug('47 --------------------------------------------------------------------🚀')
                }
                channel3.ack(messageChannel)
                logger.debug('48 --------------------------------------------------------------------🚀')
                return
              }

              const responseFromUser =
                text?.body ?? interactive?.button_reply?.title ?? button?.text
              const optionSelected =
                responseFromUser ?? interactive?.list_reply?.title

              if (category === 'question_input') {
                logger.debug('41 --------------------------------------------------------------------🚀')
                const { response } = getLastUserQuestion.question_id._doc

                // TODO -> evaluamos el mensaje enviado x el USER
                const answerCorrect: any =
                  this.metaServices.findAnswerCorrect({
                    answers: response.answers,
                    optionSelected,
                  })
                logger.debug('42 --------------------------------------------------------------------🚀')

                const isAnswerCorrect = Array.from(answerCorrect).length > 0

                // TODO -> Si es respuesta de los botones de confirmación
                // TODO -> Aqui finaliza
                if (isAnswerCorrect) {
                  logger.debug('43 --------------------------------------------------------------------🚀')
                  await this.metaServices.updateUserQuestionSended({
                    waId: wa_id,
                    messageId: getLastUserQuestion.message_id,
                    updateObject: { has_answer: true },
                  })
                  logger.debug('44 --------------------------------------------------------------------🚀')

                  if (response.answers[0].value) {
                    await this.metaServices.sendMessage({
                      waId: wa_id,
                      body: response.answers[0].value.body,
                      type: response.answers[0].value.type,
                      buttons: response.answers[0].value.buttons,
                    })
                    logger.debug('45 --------------------------------------------------------------------🚀')
                  } else {
                    logger.debug('46 --------------------------------------------------------------------🚀')
                    await this.metaServices.sendNextQuestion({ waId: wa_id })
                    logger.debug('47 --------------------------------------------------------------------🚀')
                  }
                  channel3.ack(messageChannel)
                  logger.debug('48 --------------------------------------------------------------------🚀')
                  return
                }

                const { savedDataIn } = response
                let responseBody = response.body

                logger.debug('49 --------------------------------------------------------------------🚀')
                if (savedDataIn) {
                  logger.debug('50 --------------------------------------------------------------------🚀')
                  const { column, model } = savedDataIn
                  responseBody = String(response.body).replace(
                    `{{${column}}}`,
                    String(text?.body),
                  )

                  if (model === 'users') {
                    const myObject: { [key: string]: any } = {}
                    myObject[column] = text?.body

                    await this.userServices.updateUser({
                      waId: wa_id,
                      updateObject: myObject,
                    })
                    logger.debug('51 --------------------------------------------------------------------🚀')
                  }
                } else {
                  logger.debug('52 --------------------------------------------------------------------🚀')
                  responseBody = String(response.body).replace(
                    `{{input_default}}`,
                    String(text?.body),
                  )
                }
                logger.debug('53 --------------------------------------------------------------------🚀')

                if (optionSelected === 'no' || optionSelected === 'No') {
                  logger.debug('54 --------------------------------------------------------------------🚀')
                  await this.metaServices.sendMessage({
                    waId: wa_id,
                    body: from_question.body,
                    type: from_question.type,
                    buttons: from_question?.buttons,
                  })
                  logger.debug('56 --------------------------------------------------------------------🚀')
                  channel3.ack(messageChannel)
                  logger.debug('57 --------------------------------------------------------------------🚀')
                  return
                }

                await this.metaServices.sendMessage({
                  waId: wa_id,
                  body: responseBody,
                  type: response.type,
                  buttons: response.buttons,
                })
                logger.debug('58 --------------------------------------------------------------------🚀')

                // TODO -> registrar respuesta en BD
                await this.userMessageServices.findOneAndUpdate({
                  userQuestionId: getLastUserQuestion._id,
                  waId: wa_id,
                  message: text.body,
                  idx: idx,
                  fromQuestion: from_question?.body,
                  module: getLastUserQuestion.question_id._doc.module,
                  day: getLastUserQuestion.question_id._doc.day,
                })
                logger.debug('59 --------------------------------------------------------------------🚀')

                channel3.ack(messageChannel)
                return
              }

              logger.debug('60 --------------------------------------------------------------------🚀')
              const answerCorrect: any = this.metaServices.findAnswerCorrect({
                answers,
                optionSelected,
              })
              logger.debug('61 --------------------------------------------------------------------🚀')

              const isAnswerCorrect = Array.from(answerCorrect).length > 0

              // TODO -> registrar respuesta en BD
              if (isAnswerCorrect) {
                logger.debug('62 --------------------------------------------------------------------🚀')
                await this.userMessageServices.findOneAndUpdate({
                  userQuestionId: getLastUserQuestion._id,
                  waId: wa_id,
                  message: optionSelected,
                  idx: idx,
                  fromQuestion: from_question?.body,
                  module: getLastUserQuestion.question_id._doc.module,
                  day: getLastUserQuestion.question_id._doc.day,
                })
                logger.debug('63 --------------------------------------------------------------------🚀')
              }

              // TODO -> enviar mensaje de respuesta o enviar de nuevo la última pregunta
              const questionToSent = isAnswerCorrect
                ? answerCorrect[0]
                : getLastUserQuestion.question_id._doc

              // TODO! aqui deberias deshabilitar pasar al siguiente pregunta
              if (questionToSent?.value?.is_last_message_of_day) {
                logger.debug('64 --------------------------------------------------------------------🚀')
                await this.metaServices.changeIsLastMessageOfDay({
                  waId: wa_id,
                })
                logger.debug('65 --------------------------------------------------------------------🚀')
              }

              if (questionToSent.value) {
                if (questionToSent.category === 'template') {
                  logger.debug('66.0 --------------------------------------------------------------------🚀')
                  const getUserByWaId = await this.userServices.getUserByWaId(
                    { waId: wa_id },
                  )
                  this.cronjobServices.sendMessage({
                    waId: wa_id,
                    module: getUserByWaId.active_module,
                    day: getUserByWaId.active_day,
                    rama: getUserByWaId.branch.rama,
                  })
                } else {
                  logger.debug('66 --------------------------------------------------------------------🚀')

                  await this.metaServices.sendMessage({
                    waId: wa_id,
                    body: questionToSent.value.body,
                    type: questionToSent.value.type,
                    // type: questionToSent.value.type,
                    buttons: questionToSent.value.buttons,
                    mode:'ignoreStatusOfMessage'
                  })
                }

                logger.debug('67 --------------------------------------------------------------------🚀')
              } else {
                logger.debug('68 --------------------------------------------------------------------🚀')
                await this.metaServices.sendNextQuestion({ waId: wa_id })
                logger.debug('69 --------------------------------------------------------------------🚀')
              }

              // TODO...

              if (!isAnswerCorrect) {
                logger.debug('70 --------------------------------------------------------------------🚀')
                channel3.ack(messageChannel)
                return
              }

              logger.debug('71 --------------------------------------------------------------------🚀')
              // TODO -> actualizar como has_answer `true`, indica que el usuario ya respondió correctamente a la pregunta que se le envió
              await this.metaServices.updateUserQuestionSended({
                waId: wa_id,
                messageId: getLastUserQuestion.message_id,
                updateObject: { has_answer: true },
              })
              logger.debug('72 --------------------------------------------------------------------🚀')

              // TODO -> suma al score
              if (answerCorrect[0]?.score > 0) {
                logger.debug('73 --------------------------------------------------------------------🚀')
                await this.userServices.updateScore({
                  waId: wa_id,
                  score: answerCorrect[0]?.score,
                })
                logger.debug('74 --------------------------------------------------------------------🚀')
              }

              channel3.ack(messageChannel)
              logger.debug('75 --------------------------------------------------------------------🚀')
              return
            }
          }

          logger.debug('76 --------------------------------------------------------------------🚀')
          channel3.ack(messageChannel)
          logger.debug('77 --------------------------------------------------------------------🚀')
          return
        } catch (error: any) {
          console.log("🚀 ----------------------------------------------------------------🚀")
          console.log("🚀 ~ file: rabbitmq.ts:719 ~ RabbitMQ ~ onMessage ~ error:", JSON.stringify(error))
          console.log("🚀 ----------------------------------------------------------------🚀")
          logger.error('🚀 ----------------------------------------------------------------🚀')
          logger.error('🚀 ~ file: rabbitmq.ts:497 ~ this.channel.consume ~ error:',JSON.stringify(error))
          logger.error('🚀 ----------------------------------------------------------------🚀')
          channel3.nack(messageChannel, false, true)
        }
      }
    }

    const channel3 = connectionManager.createChannel({
      json: true,
      setup: function (channel: any) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        // Note that `this` here is the channelWrapper instance.
        // return channel.assertQueue(CHANNEL_FROMWEBHOOK, { durable: true })
        return Promise.all([
          channel.assertQueue(process.env.CHANNEL_FROMWEBHOOK, {durable: true}),
          channel.prefetch(1),
          channel.consume(process.env.CHANNEL_FROMWEBHOOK, onMessage,{ noAck: false,})
      ]);
      },
    })

    channel3.waitForConnect()
    .then(function() {
        logger.debug("[RABBITMQ] Listening for messages");
    });

  }

  async obtenerMensajesEnCola(nombreCola: string, channel: any) {
    // Conectar a RabbitMQ
    // const conexion = await amqp.connect('amqp://localhost:5672')
    // const canal = await conexion.createChannel();

    // // Asegurarse de que la cola exista
    // await canal.assertQueue(nombreCola, { durable: true });

    // Configurar la cantidad máxima de mensajes que se pueden recuperar
    const cantidadMaximaMensajes = 5

    // Obtener los mensajes de la cola
    const mensajes = []
    let mensaje
    while (
      (mensaje = await channel.get(nombreCola)) !== false &&
      mensajes.length < cantidadMaximaMensajes
    ) {
      mensajes.push(mensaje)
    }

    return mensajes
  }
}
