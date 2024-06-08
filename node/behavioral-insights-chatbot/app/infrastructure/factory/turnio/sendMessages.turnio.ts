import axios, { AxiosInstance } from 'axios'
import {
  Button,
  IMetaApiResponse,
  IMetaSendMessage,
  IMetaSendMessageInteractive,
  IMetaSendMessageMedia,
  IRequestToSendContact,
  IRequestToSendInteractive,
} from '../../../utils/interfaces/meta.interface'
import type { ISendMessageFactory } from '../utils/interfaces'
import { Row } from '../360dialog/interfaces.360dialog'
import logger from '../../../utils/logger'

export class SendMessagesTurnIO implements ISendMessageFactory {
  private axiosInstance: AxiosInstance
  private readonly baseUrl: string
  private bearerToken: string

  constructor() {
    this.bearerToken = ''
    this.baseUrl = process.env.TURNIO_BASE_URL as string

    this.axiosInstance = axios.create()
    this.instanceApi()
  }

  private getToken() {
    this.bearerToken = process.env.TURNIO_TOKEN as string
  }

  private instanceApi(): void {
    this.getToken()
    this.axiosInstance = axios.create({
      baseURL: `${this.baseUrl}/v1`,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.bearerToken}`,
      },
    })
  }

  public async sendMessagePDF({ waId, body }: any): Promise<IMetaApiResponse | undefined> {
    const response = await this.axiosInstance.post(`/messages`, {
      to: waId,
      type: 'document',
      recipient_type: 'individual',
      document: {
        link: body
      },
    })

    logger.debug("🚀 -----------------------------------------------------------------------------------------------🚀")
    logger.debug("🚀 ~ file: sendMessages.turnio.ts:46 ~ SendMessagesTurnIO ~ sendMessagePDF ~ response:", JSON.stringify(response?.data))
    logger.debug("🚀 -----------------------------------------------------------------------------------------------🚀")

    return response?.data
  }

  public async sendMessageText({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse | undefined> {
      const response = await this.axiosInstance.post(`/messages`, {
        to: waId,
        type: 'text',
        text: { body },
      })
      logger.debug("🚀 ------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: sendMessages.turnio.ts:50 ~ SendMessagesTurnIO ~ response:", JSON.stringify(response.data))
      logger.debug("🚀 ------------------------------------------------------------------------------🚀")
      const data = response?.data
      return data
  }

  public async sendMessageAudio({
    waId,
    body,
  }: IMetaSendMessageMedia): Promise<IMetaApiResponse | undefined> {
      // throw new Error({
      //   meta: {
      //     version: '4.571.0',
      //     backend: { name: 'WhatsApp', version: 'latest' },
      //     api_status: 'stable',
      //   },
      //   errors: [
      //     {
      //       code: -1,
      //       details: 'Cannot send media type "audio"',
      //       title: 'Bad Request',
      //     },
      //   ],
      // } as any)
      const response = await this.axiosInstance.post(`/messages`, {
        to: waId,
        type: 'audio',
        recipient_type: 'individual',
        audio: {
          link: body,
        },
      })

      const data = response?.data
      return data
  }

  public async sendMessageImage({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse | undefined> {
      const response = await this.axiosInstance.post(`/messages`, {
        recipient_type: 'individual',
        to: waId,
        type: 'image',
        image: {
          link: body,
        },
      })
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: sendMessages.turnio.ts:126 ~ SendMessagesTurnIO ~ response:", JSON.stringify(response.data))
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      const data = response?.data
      return data
  }

  public async sendMessageSticker({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse | undefined> {
      const response = await this.axiosInstance.post(`/messages`, {
        recipient_type: 'individual',
        to: waId,
        type: 'sticker',
        sticker: {
          link: body,
        },
      })
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: sendMessages.turnio.ts:159 ~ SendMessagesTurnIO ~ response:", JSON.stringify(response.data))
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      return response?.data
  }

  public async sendMessageInteractive({
    waId,
    body,
    buttons,
  }: IRequestToSendInteractive & any): Promise<IMetaApiResponse | undefined> {
      const buttonsActions: Button[] = buttons.map(
        (button: { title: string }, idx: number) => {
          return {
            type: 'reply',
            reply: {
              id: idx.toString(),
              title: button.title,
            },
          }
        },
      )

      const response = await this.axiosInstance.post<
      string,
      any,
      IMetaSendMessageInteractive
      >(`/messages`, {
        to: waId,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: body,
          },
          action: {
            buttons: buttonsActions,
          },
        },
      })
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: sendMessages.turnio.ts:200 ~ SendMessagesTurnIO ~ response:", JSON.stringify(response.data))
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      return response?.data
  }

  public async sendMessageInteractiveList({
    waId,
    body,
    sections,
  }: {
    waId: string
    body: string
    sections: Row[]
  }): Promise<IMetaApiResponse | undefined> {
      const newSections: Row[] = sections.map((section, idx: number) => {
        return {
          id: idx.toString(),
          title: section.title,
        }
      })

      const requestBody = {
        to: waId,
        type: 'interactive',
        interactive: {
          type: 'list',
          body: {
            text: body,
          },
          action: {
            button: 'Send',
            sections: [
              {
                title: 'Selecciona una opción',
                rows: newSections,
              },
            ],
          },
        },
      }
      const response = await this.axiosInstance.post(`/messages`, requestBody)
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: sendMessages.turnio.ts:272 ~ SendMessagesTurnIO ~ response:", JSON.stringify(response.data))
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      return response?.data
  }

  public async sendMessageTemplate({
    waId,
    body: templateName,
    variables,
  }: IMetaSendMessage & { variables?: string[] }): Promise<
    IMetaApiResponse | undefined
  > {
      logger.debug('start sendMessageTemplate', waId)

      const objet = {
        to: waId,
        type: 'template',
        template: {
          namespace: process.env.NAMESPACE,
          name: templateName,
          language: {
            code: 'es_MX',
            policy: 'deterministic',
          },
          components: variables?.length
            ? [
                {
                  type: 'body',
                  parameters: variables.map((variable) => {
                    return {
                      type: 'text',
                      text: variable,
                    }
                  }),
                },
              ]
            : [],
        },
      }
      logger.debug(
        '🚀 -------------------------------------------------------------------------🚀',
      )
      logger.debug(
        '🚀 ~ file: sendMessages.turnio.ts:288 ~ SendMessagesTurnIO ~ objet:',
        JSON.stringify(objet),
      )
      logger.debug(
        '🚀 -------------------------------------------------------------------------🚀',
      )

      const response = await this.axiosInstance.post(`/messages`, objet)

      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      logger.debug("🚀 ~ file: sendMessages.turnio.ts:335 ~ SendMessagesTurnIO ~ response:", JSON.stringify(response.data))
      logger.debug("🚀 -------------------------------------------------------------------------------🚀")
      logger.debug('end sendMessageTemplate')

      return response?.data
  }

  public async sendMessageContact({
    waId,
    contact,
  }: IRequestToSendContact): Promise<IMetaApiResponse | undefined> {
      const response = await this.axiosInstance.post(`/messages`, {
        to: waId,
        type: 'contacts',
        recipient_type: 'individual',
        contacts: /* contact */ [
          {
            name: {
              first_name: 'Midis',
              formatted_name: 'Especialista Midis Juntos',
              last_name: 'Juntos',
            },
            phones: [
              {
                phone: '+1 (650) 555-1234',
                type: 'WORK',
                wa_id: '16505551234',
              },
            ],
          },
        ],
      })
      return response?.data
  }
}
