import { act, renderHook } from '@testing-library/react-hooks'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import { ProfileSchema } from '../../screens/Account/utils'
import auth from '../../services/auth'
import { App } from '../../utils/config'
import { useAuthInformation } from '../useAuthInformation'

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ user: jest.fn(), updateUserProfile: jest.fn() })

const userMock = {
  email: 'test@test.com',
  first_name: 'test',
  last_name: 'test',
  user_metadata: {
    documentNumber: '123456789',
    documentType: 'CDI',
  },
}
const responseMock = {
  email: 'test@test.com',
  first_name: 'dev',
  last_name: 'dev',
}
const updateUserProfile = jest.fn().mockResolvedValue(null)

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

beforeAll(() => {
  mockUseAuth.mockReturnValue({ user: userMock, updateUserProfile })
})

describe('useAuthInformation', () => {
  it('should show error notification when auth.updateProfile fails', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updateProfile').mockRejectedValue(new Error('error'))
    const { result } = renderHook(() => useAuthInformation(ProfileSchema))
    const reset = jest.fn()
    await act(() => result.current.updateInformation(userMock, { reset }))
    expect(show).toHaveBeenCalledWith({
      message: 'error',
      type: 'error',
    })
  })

  it('should contain user_medatada when call updateUserProfile', async () => {
    const user_metadata = {
      civilStatus: 'DI',
      documentNumber: '12312332',
      documentType: 'DNI',
    }

    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest
      .spyOn(auth, 'updateProfile')
      .mockResolvedValueOnce({ ...responseMock, user_metadata })
    const { result } = renderHook(() => useAuthInformation(ProfileSchema))
    const reset = jest.fn()
    await act(() => result.current.updateInformation(userMock, { reset }))
    expect(updateUserProfile).toHaveBeenLastCalledWith(
      expect.objectContaining({ user_metadata }),
    )
  })

  it('should show error from Schema validationError', async () => {
    const userEmptyMock = {
      first_name: '',
      email: '',
      last_name: '',
      user_metadata: {
        documentNumber: '',
        documentType: '',
      },
    }
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updateProfile').mockResolvedValueOnce(responseMock)
    const { result } = renderHook(() => useAuthInformation(ProfileSchema))
    const reset = jest.fn()
    await act(() => result.current.updateInformation(userEmptyMock, { reset }))
    expect(result.current.errors).toEqual({
      first_name: 'Campo requerido',
      email: 'Campo requerido',
      last_name: 'Campo requerido',
      'user_metadata.documentNumber': 'Campo requerido',
    })
  })

  it('should call updateUserProfile function with default values', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updateProfile').mockResolvedValueOnce(responseMock)
    const { result } = renderHook(() => useAuthInformation(ProfileSchema))
    const reset = jest.fn()
    await act(() => result.current.updateInformation(userMock, { reset }))
    expect(updateUserProfile).toHaveBeenLastCalledWith(
      expect.objectContaining(responseMock),
    )
  })

  it('should update information successfully', async () => {
    App.key = 'gestion'
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updateProfile').mockResolvedValueOnce(responseMock)
    const { result } = renderHook(() => useAuthInformation(ProfileSchema))
    const reset = jest.fn()
    await act(() => result.current.updateInformation(userMock, { reset }))
    expect(show).toHaveBeenCalledWith({
      message: 'Tus datos fueron actualizados',
      type: 'success',
    })
  })

  it('should update information successfully for EC', async () => {
    App.key = 'elcomercio'
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'updateProfile').mockResolvedValueOnce(responseMock)
    const { result } = renderHook(() => useAuthInformation(ProfileSchema))
    const reset = jest.fn()
    await act(() => result.current.updateInformation(userMock, { reset }))
    expect(show).toHaveBeenCalledWith({
      message: 'Datos actualizados correctamente',
      type: 'success',
    })
  })
})
