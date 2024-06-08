import { cleanup } from '@testing-utils/library'
import Mailer from 'react-native-mail'

import { sendFeedbackByEmail } from '../mailer'

const mockRecordError = jest.fn()
jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    recordError: mockRecordError,
  })
})

jest.mock('react-native-device-info', () => ({
  getApplicationName: jest.fn(() => 'Gestión'),
  getBrand: jest.fn(() => 'Apple'),
  getBundleId: jest.fn(() => 'com.eeec.gestion'),
  getBuildNumber: jest.fn(() => '100'),
  getReadableVersion: jest.fn(() => '3.2.1.100'),
}))

jest.mock('react-native-mail', () => ({
  mail: jest.fn(),
}))

beforeAll(() => {
  global.Request = jest.fn()
})

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({}),
    ok: true,
  })
})

afterEach(cleanup)

describe('mailer', () => {
  it('should send email and id when user is authenticated', async () => {
    const user = { email: 'ec@ec.pe', id: 'id-123' }
    sendFeedbackByEmail(user)
    expect(Mailer.mail).toHaveBeenLastCalledWith(
      expect.objectContaining({ body: expect.stringContaining(user.email) }),
      expect.any(Function),
    )
    expect(Mailer.mail).toHaveBeenLastCalledWith(
      expect.objectContaining({ body: expect.stringContaining(user.id) }),
      expect.any(Function),
    )
  })

  it('should send an error to crashlytics when it happens', () => {
    const mail = Mailer.mail as jest.Mock
    sendFeedbackByEmail({})
    const [[, callback]] = mail.mock.calls.reverse()
    callback(null)
    expect(mockRecordError).not.toBeCalled()
    callback('error')
    expect(mockRecordError).toBeCalled()
  })
})
