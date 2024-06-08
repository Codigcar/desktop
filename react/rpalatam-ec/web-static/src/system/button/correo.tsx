import * as React from 'react'
import './button.css'

import Icon from '../icon/index'

interface Props {
  children?: React.ReactNode
  onClick(): void
}

const ButtonCorreo: React.FC<Props> = props => {
  const { children, ...otherProps } = props
  return (
    <button className="is-button" type="button" {...otherProps}>
      <Icon
        type="md-mail"
        style={{ fontSize: 18, color: '#fff', marginRight: 10, top: 2 }}
      />
      {children || (
        <>
          Continuar con <span>Correo</span>
        </>
      )}
    </button>
  )
}

export default React.memo(ButtonCorreo)
