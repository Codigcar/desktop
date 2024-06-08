import React from 'react'
import './modal.css'

type Props = {
  modalRef: any
  children?: React.ReactNode
  confirmCallback?: () => void
  declineCallback?: () => void
  acceptText?: string
  declineText?: string
}

function ModalConfirmation({
  modalRef,
  confirmCallback,
  declineCallback,
  acceptText,
  declineText,
  children,
}: Props) {
  return (
    <div className="is-modal">
      <div className="is-modal__content">
        <div className="modal-confirm__body">
          {children || (
            <h1 className="heading">¿Está seguro(a) que desea continuar?</h1>
          )}
          <div className="modal-confirm__options">
            <button
              className="modal-confirm__button decline"
              onClick={() => {
                declineCallback?.()
                modalRef.remove()
              }}
            >
              {declineText || 'cancelar'}
            </button>
            <button
              className="modal-confirm__button accept"
              onClick={() => {
                confirmCallback?.()
                modalRef.remove()
              }}
            >
              {acceptText || 'aceptar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalConfirmHeading: React.FC = ({ children }) => (
  <h1 className="heading">{children}</h1>
)

const ModalConfirmHeadingHighlight: React.FC = ({ children }) => (
  <span className="heading-highlight">{children}</span>
)

const ModalConfirmText: React.FC = ({ children }) => (
  <p className="text">{children}</p>
)

ModalConfirmation.Heading = ModalConfirmHeading
ModalConfirmation.HeadingHighlight = ModalConfirmHeadingHighlight
ModalConfirmation.Text = ModalConfirmText

export default ModalConfirmation
