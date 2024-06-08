import { getAdNewsListConfig } from '../advertising'

describe('advertising', () => {
  it('should configured 8 ads for free users', () => {
    const config = getAdNewsListConfig()
    expect(Object.keys(config.free).length).toBe(8)
  })

  it('should not configured ads for subscribers', () => {
    const config = getAdNewsListConfig()
    expect(Object.keys(config.premium).length).toBe(0)
  })
})
