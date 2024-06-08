import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'

import CollapseHeader from './CollapseHeader'
import CollapseBody from './CollapseBody'
import Card from '../card'
import { View } from '../box'

type Props = {
  children: React.ReactElement[]
  disableOpacity?: boolean
  hasCardShadow?: boolean
  onPressHeader?: () => void
}

const disabledShadow: ViewStyle = {
  marginBottom: 0,
  borderRadius: 0,
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
}

export interface IUseImperative {
  closeCollapse: () => void
}

const Collapse: React.ForwardRefRenderFunction<IUseImperative, Props> = (
  { children, disableOpacity = false, hasCardShadow = false, onPressHeader },
  ref,
) => {
  let header = null
  let body = null

  const [show, setShow] = useState(false)

  React.Children.forEach(children, (child) => {
    if (child?.type === CollapseHeader) {
      header = child
    } else if (child.type === CollapseBody) {
      body = child
    }
  })

  const closeCollapse = () => {
    setShow(false)
  }

  useImperativeHandle(ref, () => ({
    closeCollapse,
  }))

  const CardBody = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={disableOpacity ? 1 : 0}
          onPress={() => {
            setShow(!show)
            onPressHeader?.()
          }}>
          {header!}
        </TouchableOpacity>
        {show ? body! : null}
      </>
    )
  }

  return (
    <View>
      {hasCardShadow ? (
        <Card.Shadow style={show && disabledShadow}>{CardBody()}</Card.Shadow>
      ) : (
        <View>{CardBody()}</View>
      )}
    </View>
  )
}

export default forwardRef(Collapse)
