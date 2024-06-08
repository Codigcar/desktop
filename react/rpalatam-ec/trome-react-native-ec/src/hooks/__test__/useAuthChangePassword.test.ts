import { useNavigation, useRoute } from '@react-navigation/native'
import { act, renderHook } from '@testing-library/react-hooks'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { App } from '../../utils/config'
import { useAuthChangePassword } from '../useAuthChangePassword'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({ params: {} })

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ signin: jest.fn() })

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('useAuthChangePassword', () => {
  it('should show error notification when auth.updatePassword fails', async () => {
    const dataMock = { newPassword: 'test1234', oldPassword: 'test1234' }
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updatePassword').mockRejectedValue(new Error('error'))
    const { result } = renderHook(() => useAuthChangePassword())
    const reset = jest.fn()
    await act(() => result.current.changePassword(dataMock, { reset }))
    expect(show).toHaveBeenCalledWith({
      message: 'error',
      type: 'error',
    })
  })

  it('should show error validation when oldPassword or newPassword is empty', async () => {
    const dataMock = { newPassword: '', oldPassword: '' }
    jest.spyOn(auth, 'updatePassword').mockResolvedValueOnce()
    const { result } = renderHook(() => useAuthChangePassword())
    const reset = jest.fn()
    await act(() => result.current.changePassword(dataMock, { reset }))
    expect(result.current.errors).toEqual({
      oldPassword: 'Campo requerido',
      newPassword: 'Campo requerido',
    })
  })

  it('should change password successfully', async () => {
    const dataMock = { newPassword: 'test1234', oldPassword: 'test12345' }
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updatePassword').mockResolvedValueOnce()
    const { result } = renderHook(() => useAuthChangePassword())
    const reset = jest.fn()
    await act(() => result.current.changePassword(dataMock, { reset }))
    expect(show).toHaveBeenCalledWith({
      message: 'Tu contraseña ha sido cambiada',
      type: 'success',
    })
  })

  it('should navigate to HomeScreen when change password for others Apps', async () => {
    App.key = 'gestion'
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const dataMock = { newPassword: 'test12345', oldPassword: 'test12345' }
    jest.spyOn(auth, 'updatePassword').mockResolvedValueOnce()
    const { result } = renderHook(() => useAuthChangePassword())
    const reset = jest.fn()
    await act(() => result.current.changePassword(dataMock, { reset }))
    expect(navigate).toHaveBeenCalledWith('Main', {
      screen: 'Home',
      params: { screen: 'Feed' },
    })
  })

  it('should reset inputs when change password for EC', async () => {
    App.key = 'elcomercio'
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const dataMock = { newPassword: 'test1234', oldPassword: 'test12345' }
    jest.spyOn(auth, 'updatePassword').mockResolvedValueOnce()
    const { result } = renderHook(() => useAuthChangePassword())
    const reset = jest.fn()
    await act(() => result.current.changePassword(dataMock, { reset }))
    expect(reset).toBeCalled()
  })
})
