import { cleanup } from '@testing-library/react-hooks'
import * as helpers from '../querys'

beforeAll(cleanup)

describe('news service-helpers', () => {
  it('queryIncludes', () => {
    expect(helpers.queryInclude('').length).toBe(0)
    expect(helpers.queryInclude('cards').length > 0).toBe(true)
  })

  it('queryBySection', () => {
    const query =
      'type:story+AND+revision.published:true+AND+NOT+taxonomy.tags.slug:"no-app"'
    const fn = helpers.getQueryBySection
    expect(fn('portada')).toBe(query)
    expect(fn('plusg').includes('premium')).toBeTruthy()
    expect(fn('other').includes('no-app')).toBeTruthy()
    expect(fn('politica-economia').includes('economia')).toBeTruthy()
    expect(fn('tecnologia-e-sports').includes('tecnologia')).toBeTruthy()
    expect(fn('politics').includes('politics')).toBeTruthy()
  })
})
