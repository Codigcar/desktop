import classNames from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './index.css'

import Icon from '../icon'

const modalRoot: HTMLDivElement =
  document.querySelector('.notification-root') || document.createElement('div')

type NotificationProps = {
  duration: number
  content: string | JSX.Element
  type: string
  animation: string
}

interface NotificationContent {
  animation?: string
  content: string | JSX.Element
  duration?: number
  type?: string
}

const Notification: React.FC<NotificationProps> = ({
  animation,
  content,
  duration,
  type,
}) => {
  const [animated, setAnimated] = useState(false)
  const [didMount, setDidMount] = useState(false)

  const el = useRef(document.createElement('div'))

  useEffect(() => {
    setAnimated(true)
    setDidMount(true)
    modalRoot.appendChild(el.current)
    if (duration > 0) {
      setTimeout(() => {
        remove()
      }, duration * 1000)
    }
  }, [duration])

  useEffect(() => {
    if (didMount && !animated) {
      setTimeout(() => {
        modalRoot.removeChild(el.current)
      }, 300)
    }
  }, [didMount, animated])

  function remove() {
    setAnimated(false)
  }

  const classes = classNames('is-notification', {
    [`is-notification-${type}`]: type,
  })

  return ReactDOM.createPortal(
    <div className={classes}>
      <CSSTransition in={animated} timeout={600} classNames={animation}>
        <div className="is-notification__content">
          <Icon type={`ios-${type}-circle`} />
          {content}
        </div>
      </CSSTransition>
    </div>,
    el.current,
  )
}

function newInstance({
  animation = 'bottomFade',
  content,
  duration = 3,
  type = '',
}) {
  const div = document.createElement('div')
  ReactDOM.render(
    <Notification
      content={content}
      type={type}
      animation={animation}
      duration={duration}
    />,
    div,
  )
}

const initNotification = (props: NotificationContent) => {
  newInstance({
    ...props,
  })
}

const api = {
  open: initNotification,
}

const allTypes = ['success', 'info', 'warning', 'error']
allTypes.forEach(type => {
  api[type] = (props: NotificationContent) => api.open({ ...props, type })
})

export interface NotificationApi {
  success(props: NotificationContent): void
  error(props: NotificationContent): void
  info(props: NotificationContent): void
  warning(props: NotificationContent): void
  open(props: NotificationContent): void
}

export default api as NotificationApi
