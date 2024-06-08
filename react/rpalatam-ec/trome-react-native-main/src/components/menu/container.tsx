import React, { useCallback, useContext, useState } from 'react'
import Box from '../box'
import { ViewProps } from '../box/types'

const MenuContext = React.createContext<MenuContextInterface>({})

type ContainerProps = ViewProps & Partial<MenuState>

export const useContextMenu = (): MenuContextInterface =>
  useContext(MenuContext)

const Container: React.FunctionComponent<ContainerProps> = (props) => {
  const { children, ...rest } = props
  const [menuState, setMenuState] = useState<MenuState>(() => ({}))

  const updateMenuState = useCallback((updatedState: Partial<MenuState>) => {
    setMenuState((prevState) => ({
      ...prevState,
      ...updatedState,
    }))
  }, [])

  return (
    <MenuContext.Provider value={{ ...menuState, updateMenuState }}>
      <Box.View px="1.5" p="1" {...rest}>
        {children}
      </Box.View>
    </MenuContext.Provider>
  )
}

export default Container
