import classNames from 'classnames'
import React from 'react'
import './eBadge.css'

type Props = {
  type?: 'outlined' | 'filled' | 'dashed'
  size?: 'small' | 'large' | 'tiny'
  color?: string
}

const EBadge: React.FC<Props> = ({
  children,
  type = 'outlined',
  size = 'small',
  color = 'default',
}) => {
  const badgeClasses = classNames('eBadge', type, size, color)

  return <div className={badgeClasses}>{children}</div>
}

export default EBadge
