import {
  BottomSheetBackgroundProps,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProps as ModalProps,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, LayoutChangeEvent, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Backdrop from './Backdrop'
import Box from '../../components/box'

const { View } = Box

type BottomSheetModalProps = ModalProps & {
  containerStyle?: ViewStyle
}

const BackgroundComponent: React.FC<BottomSheetBackgroundProps> = (props) => (
  <View
    bg="background"
    borderTopRightRadius="xl"
    borderTopLeftRadius="xl"
    {...props}
  />
)

const HandleComponent: React.FC<BottomSheetHandleProps> = (props) => (
  <View p="0.5" alignItems="center" {...props}>
    <View height={4} bg="coolGray-300" width={32} borderRadius="full" />
  </View>
)

const BottomSheetCustomModal: React.ForwardRefRenderFunction<
  BottomSheetModal,
  BottomSheetModalProps
> = (
  { children, containerStyle = {}, onChange, snapPoints, ...rest },
  forwardedRef,
) => {
  const [snapPointsAdapted, setSnapPointsAdapted] = useState(snapPoints)
  const [isVisible, setIsVisible] = useState(false)
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const container = { paddingBottom, ...containerStyle }

  const handleLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      const currentSnapPoints = snapPointsAdapted.join('')
      const nextSnapPoints = Math.floor(layout.height)
      if (currentSnapPoints !== String(nextSnapPoints)) {
        setSnapPointsAdapted([nextSnapPoints])
      }
    },
    [snapPointsAdapted],
  )

  const handleBackdropPress = useCallback(() => {
    const ref = forwardedRef as React.RefObject<BottomSheetModal>
    ref.current?.close()
  }, [forwardedRef])

  const handleChangeModal = useCallback(
    (index: number) => {
      setIsVisible(index !== -1)
      onChange?.(index)
    },
    [onChange],
  )

  useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isVisible,
    )
    return handler.remove
  }, [isVisible])

  return (
    <BottomSheetModal
      ref={forwardedRef}
      backdropComponent={(props) => (
        <Backdrop onPress={handleBackdropPress} {...props} />
      )}
      backgroundComponent={BackgroundComponent}
      handleComponent={HandleComponent}
      snapPoints={snapPointsAdapted}
      onChange={handleChangeModal}
      {...rest}>
      <BottomSheetView onLayout={handleLayout} style={container}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default React.forwardRef(BottomSheetCustomModal)
