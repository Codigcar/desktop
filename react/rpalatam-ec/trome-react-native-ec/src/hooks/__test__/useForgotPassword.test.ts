import { act, renderHook } from '@testing-library/react-hooks'

import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { useForgotPassword } from '../useForgotPassword'

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('useForgotPassword', () => {
  const user = { email: 'ec@ec.pe' }

  it('should send the mail successfully', async () => {
    const reset = jest.fn()
    const { result } = renderHook(() => useForgotPassword())
    jest.spyOn(auth, 'requestResetPassword').mockResolvedValue()
    await act(() => result.current.forgotPassword(user, { reset }))
    expect(result.current.emailSent).toBeTruthy()
  })

  it('should show a notification when an error occurs', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValue({ show })
    const { result } = renderHook(() => useForgotPassword())
    jest
      .spyOn(auth, 'requestResetPassword')
      .mockRejectedValue(new Error('error notify'))

    await act(() => result.current.forgotPassword(user, { reset: jest.fn() }))
    expect(show).toBeCalledWith({
      message: 'error notify',
      type: 'error',
    })
  })
})
