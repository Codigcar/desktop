import React, { useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import './eFollow.css'
import { AppContext } from '../../context/app'
import { RootState } from '../../store/reducers'
import Icon from '../../system/icon'

type Author = {
  _id: string
  slug: string
  name: string
  description: string
  image?: {
    url: string
  }
}

type Tag = {
  _id: string
  name: string
  slug: string
  description: string
}

type Props = {
  loading?: boolean
  followButton?: boolean
  notificationButton?: boolean
  entity: (Author | Tag) & {
    keyType: 'authors' | 'tags'
  }
}

const EFollow: React.FC<Props> = ({
  entity,
  followButton,
  notificationButton,
}: Props) => {
  const { _id, keyType, ...rest } = entity
  const { updateFollow, updateNotifications } = useContext(AppContext)
  const { isLoading, ...preferences } = useSelector(
    (state: RootState) => state.preferences,
  )
  const notificationsProperty = preferences[keyType][_id]?.notifications
  const notificationButtonRef = useRef<HTMLButtonElement>(null)

  const handleFollow = () => {
    updateFollow?.(keyType)({
      _id,
      ...rest,
    })
  }

  const handleToggleNotification = async () => {
    notificationButtonRef.current?.classList.add('loading')
    await updateNotifications?.(keyType)({
      _id,
      ...rest,
    })
    notificationButtonRef.current?.classList.remove('loading')
  }

  const isFollowing = !!preferences[keyType][_id]
  const followClassName = classNames('btn', 'e-follow', {
    active: isFollowing,
    loading: isLoading,
  })

  const notificationClassName = classNames('e-follow__notification', {
    active:
      notificationsProperty === 'enabled' ||
      notificationsProperty === undefined,
  })

  const isActiveNotifications =
    notificationsProperty === 'enabled' || notificationsProperty === undefined

  return (
    <div className="e-follow__container">
      {followButton && (
        <button
          className={followClassName}
          disabled={isLoading}
          onClick={handleFollow}
        >
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </button>
      )}
      {notificationButton && isFollowing ? (
        <button
          ref={notificationButtonRef}
          className={notificationClassName}
          onClick={handleToggleNotification}
          disabled={isLoading}
        >
          <Icon
            type={isActiveNotifications ? 'bell-filled_active' : 'bell-filled'}
            view={isActiveNotifications ? '0 0 32 32' : '0 0 15.5 19'}
            style={{
              fontSize: '20px',
              color: isActiveNotifications ? '#fff' : '#757575',
            }}
          />
        </button>
      ) : null}
    </div>
  )
}

export default EFollow
