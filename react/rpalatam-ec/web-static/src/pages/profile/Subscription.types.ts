import * as types from '@arc-publishing/sdk-sales/lib/sdk/subscription'
import { APIErrorResponse as ErrorResponse } from '@arc-publishing/sdk-sales/lib/serviceHelpers/APIErrorResponse'

export type APIErrorResponse = ErrorResponse

export type State = {
  status: string
  subscriptions?: types.SubscriptionSummary[]
  error?: Error
}

export type Action =
  | { type: 'idle' }
  | { type: 'started' }
  | { type: 'success'; response: types.SubscriptionSummary[] }
  | { type: 'error'; error: any }

export type SubscriptionActive = {
  id?: number
  response?: types.Subscription
}
