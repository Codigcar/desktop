import { DrawerActions, useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useMainNavigation } from '../../../context/navigation'
import Home from '../Home.elcomercio'
import HOME_SCREEN_SHOWN from '../homeShown'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock

jest.mock('../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock
mockUseMainNavigation.mockReturnValue({ categories: [] })

describe('Home.elcomercio', () => {
  it('open drawer', () => {
    const openDrawer = jest.spyOn(DrawerActions, 'openDrawer')
    const dispatch = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ dispatch })
    const { getByA11yLabel } = render(<Home />)
    fireEvent.press(getByA11yLabel('Menu'))
    expect(dispatch).toBeCalled()
    expect(openDrawer).toBeCalled()
  })

  it('navigate to profile screen', () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { getByA11yLabel } = render(<Home />)
    fireEvent.press(getByA11yLabel('Perfil'))
    expect(navigate).toBeCalledWith('Profile')
  })

  it('set HOME_SCREEN_SHOWN', () => {
    const set = jest.spyOn(HOME_SCREEN_SHOWN, 'set')
    render(<Home />)
    expect(set).toBeCalledTimes(1)
  })

  describe('tab view', () => {
    it('should render "portada" and "ultimo" categories', () => {
      const categories = [
        { active: true, key: 'portada', label: 'Portada' },
        { active: true, key: 'ultimo', label: 'Lo último' },
      ]
      mockUseMainNavigation.mockReturnValueOnce({ categories })
      const { getByA11yLabel } = render(<Home />)
      expect(getByA11yLabel('Portada')).toBeDefined()
      expect(getByA11yLabel('Lo último')).toBeDefined()
    })

    it('should render only active category', () => {
      const categories = [
        { active: true, key: 'portada', label: 'Portada' },
        { active: false, key: 'ultimo', label: 'Lo último' },
      ]
      mockUseMainNavigation.mockReturnValueOnce({ categories })
      const { getByA11yLabel, queryByA11yLabel } = render(<Home />)
      expect(getByA11yLabel('Portada')).toBeDefined()
      expect(queryByA11yLabel('Lo último')).toBeNull()
    })
  })
})
