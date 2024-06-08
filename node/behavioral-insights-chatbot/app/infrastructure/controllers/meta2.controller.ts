import { NextFunction, Request, Response } from 'express'
import { MetaServices } from '../../application/meta.services'
import { UserQuestionsServices } from '../../application/user_questions.services'
import {
  IRequest,
  IStatus,
  IMessageByUser,
  IContact,
} from '../../utils/interfaces/meta.interface'
import { MessageStatus } from '../../utils/interfaces/enums'
import { UserServices } from '../../application/user.services'
import RabbitMQ from '../../rabbitmq'
import { UserMessagesServices } from '../../application/user_messages.services'
import IgnoreStatus from '../../utils/ignoreStatus/ignoreStatus'
import logger from '../../utils/logger'

export class MetaController {
  constructor(
    private metaServices: MetaServices,
    private userQuestionsServices: UserQuestionsServices,
    private userServices: UserServices,
    private userMessageServices: UserMessagesServices,
  ) {}

  public connectWebhook = (req: Request, res: Response) => {
    try {
      const query = req.query
      const hub: any = query

      if (!hub) return res.send('INVALID TOKEN')

      return this.metaServices.isConnectWebhook(hub)
        ? res.send(hub['hub.challenge'])
        : res.send('INVALID TOKEN')
    } catch (e) {
      console.error('Unexpected error on "handleWhatsAppHook"', e)
    }
  }

  public testEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // await this.metaServices.sendMessage({
      //   waId: '51946100691',
      //   type: 'interactive-list',
      // body: '¿Quiénes pueden ser las personas en tu familia, tu comunidad o la posta a las que puedes recurrir para aprender?\n\nA. Enfermera del centro de salud.\nB. Mi familia.\nC. Mis vecinas y amigas.\nD. Otros.',
      // sections: [
      //   {
      //     title: 'A',
      //   },
      //   {
      //     title: 'B',
      //   },
      //   {
      //     title: 'C',
      //   },
      //   {
      //     title: 'D',
      //   },
      // ],
      // })

      //* otro
      // const response = await this.userServices.updateUser({
      //   waId:'51946100691',
      //   updateObject: {name:'test2'}
      // })

      // const getInstance = RabbitMQ.getInstance()
      // getInstance.send({message: JSON.stringify('PRUEBITAX')})

    const ignoreStatus = IgnoreStatus.getInstance()
      
      logger.debug("🚀 -----------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: meta2.controller.ts:130 ~ ignoteStatus.getList():", JSON.stringify(ignoreStatus.getList()))
      logger.debug("🚀 -----------------------------------------------------------------------------------🚀")
      const datita = ignoreStatus.getDataByPhoneNumber('51946100691')
      logger.debug("🚀 ---------------------------------------------------🚀")
      logger.debug("🚀 ~ file: meta2.controller.ts:118 ~ datita:", datita)
      logger.debug("🚀 ---------------------------------------------------🚀")

      // await this.metaServices.changeIsLastMessageOfDay({waId: '51946100691'})
      return res.json({
        statue: true,
        // response
      })
    } catch (error) {
      next(error)
    }
  }

  // private sentToRabbit = () => {
    
  // }

  public handleWhatsAppHook = async (
    req: IRequest<{
      statuses: IStatus[]
      messages: IMessageByUser[]
      contacts: IContact[]
      _vnd: any
    }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
    const getInstance = RabbitMQ.getInstance()

    if (req.body.statuses?.[0].status === MessageStatus.SENT) {
      const ignoreStatus = IgnoreStatus.getInstance()
      const datita = ignoreStatus.getDataByPhoneNumber(req.body.statuses?.[0]?.recipient_id)
      if(req.body.statuses?.[0] && Array.isArray(datita) && Array.from(datita).includes(req.body.statuses?.[0]?.id)) {
        getInstance.send({message: req.body})
        return res.json({ status: true })
      }
    }


    if(req.body.statuses?.[0].status === MessageStatus.DELIVERED ||
      req.body.contacts ||
      req.body.statuses?.[0].status === MessageStatus.READ) {
        
        
      if(req.body._vnd) return res.json({ status: true })

      const ignoreStatus = IgnoreStatus.getInstance()
      const datita = ignoreStatus.getDataByPhoneNumber(req.body.statuses?.[0]?.recipient_id)
      if(req.body.statuses?.[0] && Array.isArray(datita) && Array.from(datita).includes(req.body.statuses?.[0]?.id)) {
        return res.json({ status: true })
      }

      logger.debug("🚀 *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-🚀")
      logger.debug("🚀 ~ [SEND] file: meta2.controller.ts:103 ~ JSON.stringify(req.body):", JSON.stringify(req.body))
      logger.debug("🚀 ---------------------------------------------------------------------------------------🚀")
      // getInstance.send({message: JSON.stringify(req.body)})
      getInstance.send({message: req.body})
    }
  
   

    return res.json({ status: true })
      } catch (error) {
        logger.error('🚀 ---------------------------------------------------------------------------------🚀')
        logger.error('🚀 ~ file: meta2.controller.ts:267 ~ MetaController ~ setImmediate ~ error:',JSON.stringify(error))
        logger.error('🚀 ---------------------------------------------------------------------------------🚀')
        next(error)
      }
  }
}
