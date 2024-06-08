import { User } from '../User'

describe('User entities', () => {
  it('Create user', () => {
    const story = new User({
      id: 'id',
      email: 'test@ec.pe',
      username: 'johndoe',
    })
    expect(story.id).toBe('id')
    expect(story.email).toBe('test@ec.pe')
    expect(story.username).toBe('johndoe')
  })
})
