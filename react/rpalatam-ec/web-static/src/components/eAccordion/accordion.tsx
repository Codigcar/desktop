import React from 'react'

import Icon from '../../system/icon'
import './accordion.css'

interface CollapseProps {
  header: React.ReactNode
  children: React.ReactNode
}

export const Collapse: React.FC<CollapseProps> = props => {
  const handleCollapse = (event): void => {
    if (event.target.getAttribute('aria-expanded') === 'false') {
      // this.props.toggleAccordion(true);
      event.target.setAttribute('aria-expanded', true)
      const contentActive = Array.from(
        document.querySelectorAll('.collapse-item-active'),
      )
      if (contentActive.length > 0) {
        contentActive.forEach(item => {
          item
            .querySelector('.collapse-header')
            ?.setAttribute('aria-expanded', 'false')
          item.classList.remove('collapse-item-active')
        })
      }
    } else {
      // this.props.toggleAccordion(false);
      event.target.setAttribute('aria-expanded', false)
    }
    event.target.parentElement.classList.toggle('collapse-item-active')
  }

  return (
    <div className="collapse-item">
      <button
        className="collapse-header"
        onClick={handleCollapse}
        aria-expanded="false"
      >
        <Icon type="ios-arrow-forward" style={{ fontSize: '12px' }} />{' '}
        {props.header}
      </button>
      <div className="collapse-content">
        <div className="card__body">{props.children}</div>
      </div>
    </div>
  )
}

const EAccordion: React.FC = ({ children }) => {
  return <div className="accordion">{children}</div>
}

export default React.memo(EAccordion)
