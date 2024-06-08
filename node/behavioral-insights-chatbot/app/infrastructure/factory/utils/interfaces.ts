import type {
    IMetaApiResponse,
    IMetaSendMessage,
    IRequestToSendContact,
    IRequestToSendInteractive,
  } from '../../../utils/interfaces/meta.interface'
  
  export interface ISendMessageFactory {
    sendMessageTemplate({ waId, body, variables }: IMetaSendMessage): Promise<IMetaApiResponse | undefined>
    sendMessageText({ waId, body }: IMetaSendMessage): Promise<IMetaApiResponse | undefined>
    sendMessageAudio({ waId, body }: IMetaSendMessage): Promise<IMetaApiResponse | undefined>
    sendMessageImage({ waId, body }: IMetaSendMessage): Promise<IMetaApiResponse | undefined>
    sendMessageInteractive({
      waId,
      body,
      buttons
    }: IRequestToSendInteractive & any): Promise<IMetaApiResponse | undefined>
    sendMessageContact({ waId, contact }: IRequestToSendContact): Promise<IMetaApiResponse | undefined>
    sendMessageInteractiveList({ waId, body, sections }: any): Promise<IMetaApiResponse | undefined>
    sendMessageSticker({ waId, body }: any): Promise<IMetaApiResponse | undefined>
    sendMessagePDF({ waId, body }: any): Promise<IMetaApiResponse | undefined>
  }
  