import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './error.css'

import { AppContext } from '../../context/app'
import { RN_SCREENS_STORY_V2 } from '../../tools/flags'
import nativeApi from '../../tools/nativeApi'

interface Props {
  config: {
    categories: { key: string; path: string; label: string }[]
  }
  content: {}
  title: string
}

class EError extends React.PureComponent<Props> {
  render() {
    const { categories } = this.context
    const { content, title } = this.props

    const storyEnabled = RN_SCREENS_STORY_V2()

    return (
      <div className="error-notice">
        <h3 className="font-serif">{title}</h3>
        <p>{content}</p>
        {storyEnabled ? null : (
          <ul>
            {categories.map(category => (
              <li key={category.key}>
                <Link
                  to={category.active ? `${category.path}` : `/${category.key}`}
                  onClick={event => {
                    if (category.active) return
                    event.preventDefault()
                    nativeApi.navigate('News', {
                      section: { name: category.label, path: category.key },
                    })
                  }}
                  replace
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

EError.contextType = AppContext

const mapStateToProps = state => ({
  config: state.configBrand,
})

export default connect(mapStateToProps)(EError)
