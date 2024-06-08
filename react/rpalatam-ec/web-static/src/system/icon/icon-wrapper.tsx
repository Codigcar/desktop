import classNames from 'classnames'
import * as React from 'react'
import './icon-wrapper.css'

const IconWrapper = props => {
  const { className, children, size, ...restProps } = props
  const classes = classNames(
    'is-icon-wrapper',
    {
      [`is-${size || 'default'}`]: size,
    },
    className,
  )

  return (
    <span {...restProps} className={classes}>
      {children}
    </span>
  )
}

export default React.memo(IconWrapper)
