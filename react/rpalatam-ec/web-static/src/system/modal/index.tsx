import classNames from 'classnames'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './index.css'

const modalRoot: HTMLDivElement | null = document.querySelector('.modal-root')

interface Props {
  animation?: string
  content(Modal): JSX.Element
  disableBack: boolean
  myClass?: string
  onBackgroundPress?: () => void
}

const Modal: React.FC<Props> = ({
  content,
  myClass,
  animation,
  disableBack,
  onBackgroundPress,
}) => {
  const el = React.useRef(document.createElement('div'))
  const [animated, setAnimated] = React.useState(false)
  const [didMount, setDidMount] = React.useState(false)
  const remove = React.useCallback(() => {
    setAnimated(false)
    window.removeEventListener('popstate', remove)
  }, [])

  React.useEffect(() => {
    modalRoot?.appendChild(el.current)
    setAnimated(true)
    setDidMount(true)
    window.addEventListener('popstate', remove, false)
  }, [remove])

  React.useEffect(() => {
    if (didMount && !animated) {
      setTimeout(() => {
        modalRoot?.removeChild(el.current)
      }, 300)
    }
  }, [animated, didMount])

  const classes = classNames('is-modal-wrap', {
    [`${myClass || ''}`]: myClass,
  })

  return ReactDOM.createPortal(
    <div className={classes}>
      <CSSTransition in={animated} timeout={300} classNames="modalBack">
        <button
          className="is-modal-back"
          onClick={() => {
            if (!disableBack) {
              onBackgroundPress?.()
              return remove()
            }
            return null
          }}
          type="button"
        />
      </CSSTransition>
      <CSSTransition in={animated} timeout={300} classNames={animation}>
        {content({ remove })}
      </CSSTransition>
    </div>,
    el.current,
  )
}

function newInstance(props) {
  const div = document.createElement('div')
  ReactDOM.render(<Modal {...props} />, div)
}

function initModal(props) {
  newInstance({
    ...props,
  })
}

const api = {
  open: props => initModal(props),
}

export default api
