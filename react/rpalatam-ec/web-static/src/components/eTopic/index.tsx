import classNames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../../store/topics/actions'
import nativeApi from '../../tools/nativeApi'
import type { RootState } from '../../store/reducers'

type Props = {
  topic: string
  children: (isSubscribed: boolean) => React.ReactNode
}

const SubscriptionTopic: React.FC<Props> = ({ children, topic }) => {
  const dispatch = useDispatch()
  const { saving, topics } = useSelector((state: RootState) => state.topics)
  const isSubscribed = topics.includes(topic)

  const handleNotification = () => {
    if (isSubscribed) {
      nativeApi.unsubscribeFromTopic(topic)
      dispatch(unsubscribeFromTopic(topic))
      return
    }
    nativeApi.subscribeToTopic(topic)
    dispatch(subscribeToTopic(topic))
  }

  const classes = classNames('font-sans', { active: isSubscribed })

  return (
    <button className={classes} disabled={saving} onClick={handleNotification}>
      {children(isSubscribed)}
    </button>
  )
}

export default SubscriptionTopic
