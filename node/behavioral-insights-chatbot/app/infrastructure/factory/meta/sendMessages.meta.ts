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
import { ISendMessageFactory } from '../utils/interfaces'

export class SendMessagesMeta implements ISendMessageFactory {
  public phoneNumberId: string
  private bearerToken: string | false
  private readonly apiUrl: string
  private readonly apiVersion: string
  private axiosInstance: AxiosInstance

  constructor() {
    this.apiUrl = process.env.META_API_URL as string
    this.apiVersion = process.env.META_API_VERSION as string
    this.phoneNumberId = process.env.META_PHONE_NUMBER_ID as string
    this.axiosInstance = axios.create()
    this.bearerToken = ''
    this.instanceApi()
  }
  sendMessagePDF({ waId, body }: any): Promise<IMetaApiResponse | undefined> {
    throw new Error('Method not implemented.')
  }
  sendMessageSticker({ waId, body }: any): Promise<IMetaApiResponse> {
    throw new Error('Method not implemented.')
  }
  sendMessageInteractiveList({ waId, body, sections }: any): Promise<IMetaApiResponse> {
    throw new Error('Method not implemented.')
  }

  private getToken() {
    this.bearerToken = process.env.META_API_TOKEN as string
  }

  private instanceApi(): void {
    this.getToken()
    this.axiosInstance = axios.create({
      baseURL: `${this.apiUrl}/${this.apiVersion}/${this.phoneNumberId}`,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.bearerToken}`,
      },
    })
  }

  public async sendMessageText({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      messaging_product: 'whatsapp',
      to: waId,
      text: { body },
    })
    return data
  }

  public async sendMessageAudio({
    waId,
    body,
  }: IMetaSendMessageMedia): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: waId,
      type: 'audio',
      audio: {
        link: body,
      },
    })
    return data
  }

  public async sendMessageImage({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: waId,
      type: 'image',
      image: {
        link: body,
      },
    })
    return data
  }

  public async sendMessageInteractive({
    waId,
    body,
    buttons,
  }: IRequestToSendInteractive & any): Promise<IMetaApiResponse> {
    const buttonsActions: Button[] = buttons.map((button:{title: string}, idx: number) => {
      return {
        type: 'reply',
        reply: {
          id: idx.toString(),
          title: button.title,
        },
      }
    })

    const { data } = await this.axiosInstance.post<
      string,
      any,
      IMetaSendMessageInteractive
    >(`/messages`, {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
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
    return data
  }

  public async sendMessageTemplate({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      messaging_product: 'whatsapp',
      to: waId,
      type: 'template',
      template: {
        name: body,
        language: {
          code: 'en_US',
        },
      },
    })
    return data
  }

  sendMessageContact({ waId, contact }: IRequestToSendContact): Promise<IMetaApiResponse> {
    throw new Error('Method not implemented.')
  }
}
