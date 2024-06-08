import { parseDate } from '../utils'

describe('Search screen utils', () => {
  it('parseDate function', () => {
    const testDate = new Date('2020-05-02')
    const parsedDate = parseDate(testDate)
    expect(parsedDate).toBe('2020-05-02')

    expect(parseDate()).toBe(null)
  })
})
