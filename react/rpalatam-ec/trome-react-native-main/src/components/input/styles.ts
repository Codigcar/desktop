import { Platform, StyleSheet } from 'react-native'

export const field = StyleSheet.create({
  base: {
    flex: 1,
    fontSize: 16,
    marginVertical: 0,
    paddingVertical: 0,
  },
  input: {
    fontWeight: '500',
    height: Platform.OS === 'ios' ? 16 * 1.25 : 16 * 1.5,
  },
})
