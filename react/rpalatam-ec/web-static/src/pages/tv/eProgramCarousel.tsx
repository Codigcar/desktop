import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeList as List } from 'react-window'

import ECardVideoTv from './eCardVideo'
import { programFetch } from '../../store/tv/actions'
import Icon from '../../system/icon'

interface Props {
  dispatch: any
  path: string
  pathParent: string
  showVideo: any
  title: string
  tvState: {
    programsDetail: []
  }
}

class EProgramCarousel extends React.PureComponent<Props> {
  SCREEN_WIDTH = window.innerWidth || window.screen.width

  componentDidMount() {
    const { dispatch, path } = this.props
    dispatch(programFetch(path, { page: 0 }))
  }

  render() {
    const { path, pathParent, title, tvState, ...otherProps } = this.props
    const program = tvState.programsDetail[path]
    return (
      <div className="perutv__program">
        <div className="perutv__title">
          <h3 className="font-serif">{title}</h3>
          {program && program.length > 0 && (
            <Link
              to={{
                pathname: `${pathParent}/${path}`,
                state: { program: title },
              }}
            >
              Ver programa
            </Link>
          )}
        </div>
        {program ? (
          <List
            direction="horizontal"
            height={170}
            itemCount={program.length}
            itemData={{
              episodes: program,
              ...otherProps,
            }}
            itemSize={240}
            width={this.SCREEN_WIDTH}
          >
            {ECardVideoTv}
          </List>
        ) : (
          <div
            style={{
              textAlign: 'center',
              height: '170px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="loading" style={{ fontSize: 24 }} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  config: state.configBrand,
  tvState: state.tvState,
})

export default connect(mapStateToProps)(EProgramCarousel)
