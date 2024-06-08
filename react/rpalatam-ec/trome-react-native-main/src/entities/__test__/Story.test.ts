import { Story } from '../Story'

describe('Story entities', () => {
  it('Create story', () => {
    const story = new Story({ id: 'id', headline: 'Headline' })
    expect(story.id).toBe('id')
    expect(story.headline).toBe('Headline')
  })
})
