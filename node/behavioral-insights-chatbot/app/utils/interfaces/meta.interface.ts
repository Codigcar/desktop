export interface IMetaApiResponse {
  messaging_product: 'whatsapp'
  contacts: {
    input: string
    wa_id: string
  }[]
  messages: {
    id: string
  }[]
}

export interface IMetaHookContact {
  profile: {
    name: string
  }
  wa_id: string // Also phone
}

export interface IMetaHookMessage {
  context?: {
    from: string // This is not the phone number
  }
  from: string
  id: string // TODO: Message id?
  timestamp: string
  type: 'text' | 'audio' | 'image' | 'reaction'
  reaction?: {
    message_id: string
    emoji: string
  }
  audio?: {
    mime_type: string
    sha256: string
    id: string
    voice: boolean
  }
  text?: {
    body: string
  }
  interactive?: {
    type: string
    button_reply: {
      id: string
      title: string
    }
    list_reply: {
      description: string
      id: string
      title: string
    }
  }
}

export interface IMetaHookStatus {
  id: string
  status: string // TODO: Verify sent | delivered | read
  timestamp: string
  recipient_id: string
  conversation: {
    id: string // TODO: make a code-spike on this
    expiration_timestamp: string
    origin: {
      type: string // TODO: is this the message category type?
    }
  }
  pricing: {
    billable: boolean
    pricing_model: string
    category: string
  }
  errors?: [
    {
      code: number
      title: string
      message: string
      error_data: {
        details: string
      }
      href: string // Important for error tracking.
    },
  ]
}

export interface IMetaHookChanges {
  field: string
  value: {
    messaging_product: string // TODO: Verify that is from whatsapp
    metadata: {
      display_phone_number: string
      phone_number_id: string // TODO: Verify is this is the key value ?
    }
    contacts?: IMetaHookContact[]
    messages?: IMetaHookMessage[]
    statuses?: IMetaHookStatus[]
  }
}

export interface MetaHookEntriesInterface {
  id: string
  changes: IMetaHookChanges[]
}

export interface IMetaHookNotification {
  object: 'whatsapp_business_account' // This is the unique hook needed.
  entry: MetaHookEntriesInterface[]
}

export interface IMetaVerificationHub {
  'hub.mode'?: string
  'hub.challenge'?: number
  'hub.verify_token'?: string
}

export interface IMetaMessageBody {
  messaging_product: 'whatsapp'
  to: string
  type?: 'audio' | 'image' | 'interactive'
  audio?: {
    link: string
  }
  image?: {
    link: string
  }
  text?: {
    body: string
  }
  interactive?: {
    //TODO: Complete interactive method
  }
}

export interface IMetaMessageResponse {
  messaging_product: 'whatsapp'
  contacts: {
    input: string
    wa_id: string
  }[]
  messages: {
    id: string
  }[]
}

export interface IMetaMessageModel {}

export interface IMetaSendMessage {
  waId: string
  body: string
  variables?: string[]
}

export interface IRequestToSendInteractive {
  waId: string
  body: string
}

/* IRequestToSendContact */
export interface IRequestToSendContact {
  waId: string
  contact: IRequestToSendContactBody[]
}

export interface IRequestToSendContactBody {
  name: Name
  phones: Phone[]
}

export interface Name {
  first_name: string
  formatted_name: string
  last_name: string
}

export interface Phone {
  phone: string
  type: string
  wa_id: string
}

/* ...IRequestToSendContact  */
export interface IButtonsInteractive {
  buttons: {
    title: string
  }[]
}
export interface IMetaSendMessageMedia {
  waId: string
  body: string
}

export interface IMetaSendMessageInteractive {
  messaging_product?: string
  recipient_type?: string
  to: string
  type: string
  interactive: Interactive
}

export interface Interactive {
  type: string
  body: Body
  action: Action
}

export interface Action {
  buttons: Button[]
}

export interface Button {
  type: string
  reply: Reply
}

export interface Reply {
  id: string
  title: string
}

export interface Body {
  text: string
}

//---------
// Interface para cuando BOT -> USER

export interface IStatuses {
  statuses: IStatus[]
}

export interface IStatus {
  conversation: Conversation
  id: string
  message: MessageByBot
  pricing: Pricing
  status: string
  timestamp: string
  type: string
  recipient_id: string
}

export interface Conversation {
  expiration_timestamp: number
  id: string
  origin: Origin
}

export interface Origin {
  type: string
}

export interface MessageByBot {
  recipient_id: string
}

export interface Pricing {
  billable: boolean
  category: string
  pricing_model: string
}

// Interface para cuando BOT <- USER

export interface IMessage {
  messages: IMessageByUser[]
  contacts: IContact[]
}

export interface IContact {
  profile: Profile
  wa_id: string
}

export interface IImage {
  caption: null
  id: string
  mime_type: string
  sha256: string
  status: string
}

export interface Profile {
  name: string
}

export interface IMessageByUser {
  from: string
  id: string
  text: Text
  timestamp: string
  type: string
  interactive?: {
    type: string
    button_reply: {
      id: string
      title: string
    }
    list_reply: {
      description: string
      id: string
      title: string
    }
  }
  voice?: {
    id: string
    mime_typelevation: string
    sha256: string
    status: string
  }
  image?: {
    caption: null
    id: string
    mime_type: string
    sha256: string
    status: string
  }
  button?: {
    payload: null,
    text: string
  }
}

export interface Text {
  body: string
}

//

export interface IRequest<T> extends Express.Request {
  body: T
}

//

export interface ISendMessageText {
  to: string
  type: string
  text: ITextBody
}

export interface ITextBody {
  body: string
}
