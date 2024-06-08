import { User } from '../../entities/User'

type Interval = 'day' | 'week' | 'month' | 'year'
export interface SubscriptionItem {
  currency: string
  interval: Interval | string
  interval_count: number
  price: number
}

export interface SubscriptionDetail {
  id: string
  items: SubscriptionItem[]
  name: string
  next_billing_date: number
  status: string
}

interface Plan {
  interval: Interval | string
  interval_count: number
  price: number
}

export interface SubscriptionPlan extends Plan {
  id: string
  name: string
  offer: Plan | null
}

export interface Subscription {
  checkAccess(params: Record<string, string | undefined>): Promise<boolean>
  startDate(id: User['id']): Promise<number | null>
  list(id: User['id']): Promise<SubscriptionDetail[]>
  plan(id: string): Promise<SubscriptionPlan>
}
