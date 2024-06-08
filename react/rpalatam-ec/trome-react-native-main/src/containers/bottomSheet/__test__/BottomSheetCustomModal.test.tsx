import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { View } from 'react-native'

import { BottomSheetCustomModal, BottomSheetModalProvider } from '../index'

jest.useFakeTimers()

describe('BottomSheetCustomModal', () => {
  it('should (un)mount the Backdrop', async () => {
    const modalRef: React.RefObject<BottomSheetCustomModal> = { current: null }

    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <BottomSheetCustomModal ref={modalRef} snapPoints={[200]}>
          <View />
        </BottomSheetCustomModal>
      </BottomSheetModalProvider>,
    )

    act(() => modalRef.current?.present())
    act(() => jest.runAllTimers())

    const backdrop = getByTestId('backdrop-touchable')
    expect(backdrop).toBeDefined()

    const fnCloseModal = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    modalRef.current!.close = fnCloseModal

    fireEvent.press(backdrop)
    expect(fnCloseModal).toBeCalled()

    act(() => modalRef.current?.present())
  })
})
