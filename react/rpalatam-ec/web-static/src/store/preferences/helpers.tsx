import React from 'react'
import Modal from '../../system/modal'
import ModalConfirmation from '../../components/eModal/modalConfirmation'
import type { ConfirmOptions, ConfirmResult } from './types'

export const launchConfirmModal = (
  options: ConfirmOptions,
): Promise<ConfirmResult> => {
  const { Heading, HeadingHighlight, Text } = ModalConfirmation

  return new Promise(resolve => {
    Modal.open({
      content: elm => (
        <ModalConfirmation
          modalRef={elm}
          acceptText={options.textAccept || 'Aceptar'}
          declineText={options.textDecline || 'Cancelar'}
          confirmCallback={() => resolve('accepted')}
          declineCallback={() => resolve('declined')}
        >
          <Heading>{options.heading}</Heading>
          <HeadingHighlight>{options.highlight}</HeadingHighlight>
          <Text>{options.text}</Text>
        </ModalConfirmation>
      ),
      myClass: 'is-modal-bottom is-modal-register is-modal-swh',
      animation: 'bottomFade',
      onBackgroundPress: () => resolve('declined'),
    })
  })
}
