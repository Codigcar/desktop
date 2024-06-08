import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { fetchPaywallCampaign } from '../services/paywall-campaign'
import { getBrand } from '../tools/tools'

export const paywallContext = createContext({})

export const usePaywallContext = () => useContext(paywallContext)

export const PaywallProvider: React.FC = ({ children }) => {
  const brand = useMemo(() => getBrand(), [])
  const [campaign, setCampaign] = useState<any>(null)

  useEffect(() => {
    fetchPaywallCampaign(brand).then(res => {
      if (res?.ok) {
        setCampaign(res?.data)
      }
    })
  }, [])

  return (
    <paywallContext.Provider value={campaign}>
      {children}
    </paywallContext.Provider>
  )
}
