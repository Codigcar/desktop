import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { openInBrowser } from '../../../utils/inappbrowser'
import { autoLineHeight } from '../Text'
import Typography from '../index'

jest.mock('../../../utils/inappbrowser')

const { Link, Paragraph, Title } = Typography

describe('Typography', () => {
  it('Link', () => {
    const onPress = jest.fn()
    const to = 'https://elcomercio.pe/'
    const { getByText } = render(
      <Link onPress={onPress} to={to}>
        Link
      </Link>,
    )
    const link = getByText('Link')
    expect(link).toHaveStyle({ color: '#0089ff', fontWeight: '700' })
    fireEvent.press(link)
    expect(openInBrowser).toBeCalledWith(to)
    expect(onPress).toBeCalled()
  })

  it('Title', () => {
    const { getByText } = render(<Title lineHeight="none">Header</Title>)
    expect(getByText('Header')).toHaveStyle({
      fontFamily: 'NotoSerif-SemiCondensedBold',
      lineHeight: 16,
    })
  })

  it('Paragraph', () => {
    const { getByText } = render(<Paragraph lineHeight="none">Body</Paragraph>)
    expect(getByText('Body')).toHaveStyle({
      fontFamily: 'Avenir',
      fontSize: 16,
      lineHeight: 16,
    })
  })

  it('Text with auto lineHeight', () => {
    expect(autoLineHeight('xxs')).toBe('3')
    expect(autoLineHeight('xs')).toBe('4')
    expect(autoLineHeight('sm')).toBe('5')
    expect(autoLineHeight('base')).toBe('6')
    expect(autoLineHeight('lg')).toBe('7')
    expect(autoLineHeight('xl')).toBe('7')
    expect(autoLineHeight('2xl')).toBe('8')
    expect(autoLineHeight('3xl')).toBe('9')
    expect(autoLineHeight('4xl')).toBe('10')
    expect(autoLineHeight('5xl')).toBeUndefined()
    expect(autoLineHeight('6xl')).toBeUndefined()
    expect(autoLineHeight()).toBeUndefined()
  })
})
