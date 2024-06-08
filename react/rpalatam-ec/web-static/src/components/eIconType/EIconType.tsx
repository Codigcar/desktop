import React from 'react'
import './index.css'

import Icon from '../../system/icon/index'

interface Props {
  type: string
  loading?: boolean
}

const IconType: React.FC<Props> = ({ type, loading = false }) => {
  const getText = type === 'video' ? 'VIDEO' : 'FOTOS'
  const getIcon = type === 'video' ? 'md-play' : 'md-albums'

  return (
    <div className="type-note">
      <div className="type-note-background" />
      <React.Fragment>
        <Icon type={loading ? 'loading' : getIcon} />
        <span>{getText}</span>
      </React.Fragment>
    </div>
  )
}

export default React.memo(IconType)
