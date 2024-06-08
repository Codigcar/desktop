import { AllProps, Theme } from '../../theme'
import { App } from '../../utils/config'

export const backgroundColor = App.select<keyof Theme['colors']>({
  elcomercio: 'background.2',
  default: 'background',
})

export const indicatorColor = App.select<keyof Theme['colors']>({
  elcomercio: 'text.1',
  default: 'link',
})

export const borderColor = App.select<keyof Theme['colors']>({
  elcomercio: 'stroke.1',
  default: 'separator',
})

export const activeSwitchColor = App.select<keyof Theme['colors']>({
  gestion: 'link',
  default: 'primary',
})

export const fontStyleDisplayName = App.select<AllProps>({
  elcomercio: { color: 'text.3' },
  default: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'coolGray-700',
  },
})

export const fontStyleSectionHeader = App.select<AllProps>({
  elcomercio: { fontSize: 'xl', color: 'secondary', fontWeight: 'black' },
  trome: { color: 'coolGray-500', fontWeight: 'medium' },
  default: { color: 'badgeFont', fontWeight: 'black' },
})

export const sectionSeparatorStyle = App.select<AllProps>({
  elcomercio: {},
  default: {
    backgroundColor: 'backgroundSecondary',
  },
})

export const renderItemStyle = App.select<AllProps>({
  elcomercio: { mx: '1.5' },
  default: { px: '1.5' },
})

export const contentSectionHeader = App.select<AllProps>({
  elcomercio: {
    borderTopColor: 'primary',
    borderTopWidth: 1,
  },
  default: {},
})
