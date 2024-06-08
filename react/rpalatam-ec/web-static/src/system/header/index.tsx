import classNames from 'classnames'
import * as React from 'react'

interface Props {
  align?: string
  children: React.ReactNode
  className?: string
  theme?: string
}

const Header: React.FC<Props> = props => {
  const { align, children, className, theme, ...restProps } = props
  const classes = classNames(
    'is-header safe-area-inset-top',
    {
      [`is-${align || 'default'}`]: align,
      [`is-${theme || 'light'}`]: true,
    },
    className,
  )

  return (
    <div {...restProps} className={classes}>
      {children}
    </div>
  )
}

export default React.memo(Header)
