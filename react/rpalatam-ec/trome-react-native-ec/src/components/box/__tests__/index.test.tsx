import { render } from '@testing-utils/library'
import React from 'react'

import Box from '../index'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box

describe('Box', () => {
  it('KeyboardAvoidingView', () => {
    const { queryByTestId } = render(
      <KeyboardAvoidingView flex={1} testID="keyboardavoidingview" />,
    )
    expect(queryByTestId('keyboardavoidingview')).toHaveStyle({ flex: 1 })
    expect(queryByTestId('keyboardavoidingview')?.type).toBe('View')
  })

  it('View', () => {
    const { queryByTestId } = render(<View bg="white" testID="view" />)
    expect(queryByTestId('view')).toHaveStyle({ backgroundColor: '#FFFFFF' })
    expect(queryByTestId('view')?.type).toBe('View')
  })

  it('SafeAreaView', () => {
    const { queryByTestId } = render(
      <SafeAreaView flex={1} testID="safeareaview" />,
    )
    expect(queryByTestId('safeareaview')).toHaveStyle({ flex: 1 })
    expect(queryByTestId('safeareaview')?.type).toBe('RNCSafeAreaView')
  })

  it('ScrollView', () => {
    const { queryByTestId } = render(
      <ScrollView flex={1} testID="scrollview" />,
    )
    expect(queryByTestId('scrollview')).toHaveStyle({ flex: 1 })
    expect(queryByTestId('scrollview')?.type).toBe('RCTScrollView')
  })
})
