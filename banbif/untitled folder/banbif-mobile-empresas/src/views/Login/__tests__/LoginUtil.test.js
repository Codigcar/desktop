import { needsAppUpdate } from '../AppVersionUtils'

describe('test app update function', () => {
  it('should return true if current patch version is minor', () => {
    const result = needsAppUpdate([1,2,10], [1,2,11])
    expect(result).toEqual(true)
  })

  it('should return false if current and installed versions are the same', () => {
    const result = needsAppUpdate([1,2,10], [1,2,10])
    expect(result).toEqual(false)
  })

  it('should return false if installed version is newer', () => {
    const result = needsAppUpdate([1,2,13], [1,2,1])
    expect(result).toEqual(false)
  })
})
