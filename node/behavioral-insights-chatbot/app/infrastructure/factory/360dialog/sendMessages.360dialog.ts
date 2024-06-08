import { IMetaEntity } from '../../../domain/meta/meta.entity'
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
import { Row, Section } from './interfaces.360dialog'

export class SendMessages360Dialog implements ISendMessageFactory {
  private axiosInstance: AxiosInstance
  private readonly baseUrl: string
  private bearerToken: string

  constructor() {
    this.bearerToken = ''
    this.baseUrl = process.env.DIALOG_BASE_URL as string

    this.axiosInstance = axios.create()
    this.instanceApi()
  }
  sendMessagePDF({ waId, body }: any): Promise<IMetaApiResponse | undefined> {
    throw new Error('Method not implemented.')
  }
  sendMessageSticker({ waId, body }: any): Promise<IMetaApiResponse> {
    throw new Error('Method not implemented.')
  }

  private getToken() {
    this.bearerToken = process.env.DIALOG_TOKEN as string
  }

  private instanceApi(): void {
    this.getToken()
    this.axiosInstance = axios.create({
      baseURL: `${this.baseUrl}/v1`,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'D360-Api-Key': `${this.bearerToken}`,
      },
    })
  }

  public async sendMessageText({
    waId,
    body,
  }: IMetaSendMessage): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      to: waId,
      type: 'text',
      text: { body },
    })
    return data
  }

  public async sendMessageAudio({
    waId,
    body,
  }: IMetaSendMessageMedia): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      to: waId,
      type: 'audio',
      recipient_type: 'individual',
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

  public async sendMessageInteractiveList({
    waId,
    body,
    sections,
  }: {
    waId: string
    body: string
    sections: Row[]
  }): Promise<IMetaApiResponse> {
    const newSections: Row[] = sections.map((section, idx: number) => {
      return {
        id: idx.toString(),
        title: section.title,
      }
    })

    const { data } = await this.axiosInstance.post(`/messages`, {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
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
        namespace: 'c8ae5f90_307a_ca4c_b8f6_d1e2a2573574',
        name: body,
        language: {
          policy: 'deterministic',
          code: 'de',
        },
      },
    })
    return data
  }

  public async sendMessageContact({
    waId,
    contact,
  }: IRequestToSendContact): Promise<IMetaApiResponse> {
    const { data } = await this.axiosInstance.post(`/messages`, {
      to: waId,
      type: 'contacts',
      recipient_type: 'individual',
      contacts: contact /* [
        {
          name: {
            first_name: 'John',
            formatted_name: 'John Smith',
            last_name: 'Smith',
          },
          phones: [
            {
              phone: '+1 (650) 555-1234',
              type: 'WORK',
              wa_id: '16505551234',
            },
          ],
        },
      ] */,
    })
    return data
  }
}
