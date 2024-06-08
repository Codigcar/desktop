import classNames from 'classnames'
import * as React from 'react'
import './index.css'

import ICONS from './icons-svg'

type IconProps = {
  type: string
  view?: string
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = (props) => {
  const { type, view, className, ...restProps } = props
  const classes = classNames('is-icon', className)

  if (type === 'loading') {
    return (
      <i {...restProps} className={classes}>
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 50 50">
          <title>Icon</title>
          {ICONS[type].map((p) => (
            <path d={p} key={p}>
              {type === 'loading' && (
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          ))}
        </svg>
      </i>
    )
  }

  return (
    <i {...restProps} className={classes} aria-label={type}>
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox={view || '64 64 896 896'}
      >
        <title>Icon</title>
        {ICONS[type] &&
          ICONS[type].map((p, i) => (
            <path className={`${type}-${i + 1}`} d={p} key={p} />
          ))}
      </svg>
    </i>
  )
}

export default React.memo(Icon)
