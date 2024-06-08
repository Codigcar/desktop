import classNames from 'classnames'
import React, { useState } from 'react'
import './input.css'

import Icon from '../icon'

const regexValue = {
  text: /^[a-zA-ZÀ-ÿ\s]+$/,
  number: /[0-9]+/,
  alphanumeric: /[a-zA-Z0-9]+$/,
  all: /./,
}

type Mode =
  | 'text'
  | 'none'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search'

interface Props {
  ariaLabelledby?: string
  disabled?: boolean
  field: {
    name: string
    value: any
    onChange?: any
    onBlur?: any
    onFocus?: any
    maxLength?: any
    autoComplete?: any
  }
  form: {
    touched: {}
    errors: {}
  }
  label: string
  mode?: Mode
  type: string
  valid: string
}

const CustomInput: React.FC<Props> = ({
  ariaLabelledby,
  disabled,
  field,
  form: { touched, errors },
  label,
  mode,
  type,
  valid,
}) => {
  const [showPass, setShowPass] = useState(false)

  function validInput(event) {
    const z = event.data
    const regexType = regexValue[valid] || regexValue.all
    if (z && regexType.test(z)) {
      return z
    }
    return event.preventDefault()
  }

  const error = field.name && touched[field.name] && errors[field.name]
  const classes = classNames('input-group', {
    'input-group-disabled': disabled,
    'input-error': error,
  })

  const toggleShowPass = () => {
    setShowPass(!showPass)
  }

  return (
    <div className={classes}>
      <div className="input-group-content">
        <label
          htmlFor={ariaLabelledby}
          className={field.value ? 'label-active' : 'label-inactive'}
        >
          {label}
        </label>
        <input
          {...field}
          type={!showPass ? type : 'text'}
          aria-label={ariaLabelledby}
          aria-labelledby={ariaLabelledby}
          onBeforeInput={validInput}
          disabled={disabled}
          inputMode={mode}
        />
        {type === 'password' && (
          <button
            type="button"
            className="icon-show-pass"
            onClick={toggleShowPass}
            data-testid="toogleIconPass"
          >
            <Icon type={showPass ? 'md-eye-off' : 'md-eye'} />
          </button>
        )}
      </div>
      {error && <div className="error">{errors[field.name]}</div>}
    </div>
  )
}

export default React.memo(CustomInput)
