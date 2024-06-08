export interface CampaignInterface {
  name: string
  plans: {
    monthly: {
      initial: { amount: number; durationCount: number }
      normal: { amount: number; durationCount: number }
    }
  }
}

function parsePaywallResponse(response: any) {
  try {
    const {
      products: [{ pricingStrategies, name }],
    } = response

    const [{ rates }] = pricingStrategies.filter(
      ({ rates: [rate] }) =>
        rate.billingFrequency === 'Month' && rate.billingCount === 1,
    )

    const monthly = rates.reduce((acc, rate) => {
      const { duration, amount, durationCount } = rate
      const key = duration !== 'UntilCancelled' ? 'initial' : 'normal'
      acc[key] = {
        amount: Number(amount.replace(/.\d{1,}$/, '')),
        durationCount,
      }
      return acc
    }, {})

    return {
      name,
      plans: {
        monthly,
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchPaywallCampaign = async (brand: string) => {
  try {
    const request = await fetch(
      `${process.env.REACT_APP_PAYWALL_URL_CAMPAIGN}/${brand}/`,
    )
    const resJSON = await request.json()
    const parsed: CampaignInterface = parsePaywallResponse(resJSON)
    return {
      ok: true,
      data: parsed,
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
    }
  }
}
