interface Analytics {
  setAnalyticsEnabled(enabled: boolean): Promise<{ response: boolean }>
  getInstance(): Promise<{ response: boolean }>
}

const HMSAnalytics: Analytics = {
  async setAnalyticsEnabled() {
    return { response: false }
  },
  async getInstance() {
    return { response: false }
  },
}

export default HMSAnalytics
