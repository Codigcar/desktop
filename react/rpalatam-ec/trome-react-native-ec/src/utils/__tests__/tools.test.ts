import * as tool from '../tools'

describe('tools', () => {
  it('getDomain', () => {
    const domain = tool.getDomain()
    expect(domain).toMatch(/^\w+.\w+$/)
  })

  it('insert into array', () => {
    const arr = ['uno', 'tres']
    const obj = { 1: 'dos', 4: 'cuatro' }
    const newArray = tool.insertIntoArray(arr, obj)
    expect(newArray.length).toBe(3)
    expect(newArray[1]).toBe('dos')
  })

  it('should get time since if less than 24 hours', () => {
    const sampleDate = new Date()
    sampleDate.setSeconds(sampleDate.getSeconds() - 5)
    expect(tool.timeSince(sampleDate.toISOString())).toBe('hace 5 s')

    sampleDate.setMinutes(sampleDate.getMinutes() - 2)
    expect(tool.timeSince(sampleDate.toISOString())).toBe('hace 2 min')

    sampleDate.setHours(sampleDate.getHours() - 4)
    expect(tool.timeSince(sampleDate.toISOString())).toBe('hace 4 h')
  })

  it('should get the formatted date if it is greater than 24 hours', () => {
    const sampleDate = new Date('2022-07-15T18:46:28.852Z')
    expect(tool.timeSince(sampleDate.toISOString())).toBe('15.07.2022')
  })

  it('should get a null if the date is isvalid', () => {
    expect(tool.timeSince('invalid-date')).toBeNull()
  })

  it('clean text', () => {
    expect(tool.cleanText('text')).toBe('text')
    expect(tool.cleanText()).toBe('')
    expect(tool.cleanText('')).toBe('')
    expect(tool.cleanText('undefined')).toBe('')
    expect(tool.cleanText('null')).toBe('')
    expect(tool.cleanText('-')).toBe('')
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
