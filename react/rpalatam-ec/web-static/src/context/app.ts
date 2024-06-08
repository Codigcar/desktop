import React from 'react'

interface AppContextInterface {
  activePlayer?: (action?: boolean) => void
  categories: {
    active?: boolean
    ad?: string
    key: string
    label: string
    path: string
  }[]
  dataUpdate?: any
  nightMode?: boolean
  profile?: null | {
    attributes?: any
    contacts?: any[]
    uuid: string
    email: string
    emailVerified: boolean
    firstName?: string
    lastName?: string
    identities?: any
    accountReference?: any
  }
  paywallStatus?: boolean
  sign?: boolean
  signOut?: any
  signIn?: any
  update?: (dataUpdate: any) => void
  togglePaywallStatus?: any
  updateFollow?: (entity: string) => (body: any) => void
  updateNotifications?: (entity: string) => (body: any) => Promise<void>
  setNightMode: (mode: boolean) => void
}

const initialContext = {
  categories: [],
}

export const AppContext = React.createContext<AppContextInterface>(
  (initialContext as unknown) as AppContextInterface,
)
