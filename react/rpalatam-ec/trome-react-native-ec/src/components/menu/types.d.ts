type MenuState = {
  [key: string]: unknown
}

interface MenuContextInterface {
  updateMenuState?: (updatedState: Partial<MenuState>) => void
}
