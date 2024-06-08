import classNames from 'classnames'
import * as React from 'react'
import './icon-group.css'

const IconGroup = props => {
  const { className, children, ...restProps } = props
  const classes = classNames('is-icon-group', className)

  return (
    <div {...restProps} className={classes}>
      {children}
    </div>
  )
}

export default React.memo(IconGroup)
