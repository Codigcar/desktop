import { FilterKeys } from '../../../context/search'
import { getFilters, parseDate } from '../utils'

describe('Search screen utils', () => {
  it('parseDate function', () => {
    const testDate = new Date('2020-05-02')
    const parsedDate = parseDate(testDate)
    expect(parsedDate).toBe('2020-05-02')

    expect(parseDate()).toBe(null)
  })

  describe('getFilters', () => {
    it('should set term and last section if there is not a section in data', () => {
      const filters: Map<FilterKeys, string> = new Map([
        ['section', 'defaultSection'],
      ])
      const resultGetFilter = getFilters(filters, { term: 'text   ' })

      expect(resultGetFilter.get('term')).toEqual('text')
      expect(resultGetFilter.get('section')).toEqual('defaultSection')
    })

    it('should set term and section if there is a section in data', () => {
      const filters: Map<FilterKeys, string> = new Map([])
      const resultGetFilter = getFilters(filters, {
        term: 'text   ',
        section: 'formSection',
      })

      expect(resultGetFilter.get('term')).toEqual('text')
      expect(resultGetFilter.get('section')).toEqual('formSection')
    })

    it('should set searchDate if this is custom and dateTo is null', () => {
      const filters: Map<FilterKeys, string> = new Map([])
      const resultGetFilter = getFilters(filters, {
        term: 'text   ',
        searchDate: 'custom',
        dateFrom: new Date('December 17, 1995 03:24:00'),
      })

      expect(resultGetFilter.get('dateFrom')).toEqual('1995-12-17')
      expect(resultGetFilter.get('dateTo')).toBeUndefined()
    })

    it('should set searchDate if this is custom and dateFrom is null', () => {
      const filters: Map<FilterKeys, string> = new Map([])
      const resultGetFilter = getFilters(filters, {
        term: 'text   ',
        searchDate: 'custom',
        dateTo: new Date('December 17, 1995 03:24:00'),
      })

      expect(resultGetFilter.get('dateTo')).toEqual('1995-12-17')
      expect(resultGetFilter.get('dateFrom')).toBeUndefined()
    })

    it('should get dateFrom and dateTo from filters', () => {
      const filters: Map<FilterKeys, string> = new Map([
        ['dateFrom', '1995-12-17'],
        ['dateTo', '1995-12-20'],
      ])
      const resultGetFilter = getFilters(filters, {
        term: 'text   ',
      })

      expect(resultGetFilter.get('dateFrom')).toEqual('1995-12-17')
      expect(resultGetFilter.get('dateTo')).toEqual('1995-12-20')
    })
  })
})
