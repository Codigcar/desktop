import React from 'react'
import Observer from '@researchgate/react-intersection-observer'
import './index.css'

import { taboolaEvent } from '../../tools/taboola'

interface Props {
  active: boolean
  mode: string
  brand: string
  path: string
}

class ETaboola extends React.Component<Props> {
  state = {
    isIntersecting: false,
  }

  handleIntersection = ({ isIntersecting }) => {
    const { active, mode, brand, path } = this.props
    if (isIntersecting) {
      this.setState({ isIntersecting })
      if (active) {
        taboolaEvent(
          {
            article: 'auto',
            url: path,
          },
          brand,
          mode,
        )
      }
    }
  }

  render() {
    const { isIntersecting } = this.state
    const options = {
      onChange: this.handleIntersection,
      rootMargin: '0% 0% 350px',
      disabled: isIntersecting,
      root: '.wrap-view-new',
    }

    return (
      <Observer {...options}>
        <div className="new-ajust">
          <div id="taboola-below-article-thumbnails" />
        </div>
      </Observer>
    )
  }
}

export default ETaboola
