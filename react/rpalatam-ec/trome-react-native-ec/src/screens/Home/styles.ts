import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  indicator: { backgroundColor: '#FFCB05' },
  label: { color: 'transparent', fontWeight: 'bold' },
  labelActive: { color: '#000000', fontWeight: 'bold' },
  labelInactive: { color: '#8E8E8E', fontWeight: 'normal' },
  tab: { width: 'auto' },
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
  },
  webview: {
    flex: 1,
    opacity: 0.99,
  },
})

export default styles
