import React, { createContext, useCallback, useContext, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

type Props = {
  steps: string[]
  initialStep?: string
  modalRef?: any
  onCloseModal?: () => void
  children?: (infoChildrens: {
    currentStep: string
    index: number
    total: number
    goBack: () => void
    goForward: () => void
  }) => React.ReactElement
}

type Context = {
  currentStep: string
  goBack: () => void
  goForward: () => void
}

const ModalStepsContext = createContext<Context>({} as Context)
const useModalStepContext = () => useContext(ModalStepsContext)

const ModalSteps: React.FC<Props> = ({
  initialStep,
  steps,
  children,
  modalRef,
  onCloseModal,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep || steps[0])

  const goForward = useCallback(() => {
    setCurrentStep(prevStep => {
      return steps[steps.indexOf(prevStep) + 1] || steps[steps.length - 1]
    })
  }, [steps])

  const goBack = useCallback(() => {
    setCurrentStep(prevStep => {
      return steps[steps.indexOf(prevStep) - 1] || steps[0]
    })
  }, [steps])

  const handleCloseModal = useCallback(() => {
    const index = steps.indexOf(currentStep)
    if (index === 0) {
      onCloseModal?.()
      modalRef?.remove()
      return
    }
    goBack()
  }, [onCloseModal, currentStep, modalRef, goBack, steps])

  return (
    <ModalStepsContext.Provider value={{ currentStep, goBack, goForward }}>
      <div className="is-modal">
        <div className="is-modal__content">
          <TransitionGroup>
            <CSSTransition
              key={currentStep}
              classNames="fadeBottom"
              timeout={{ enter: 450, exit: 450 }}
            >
              {children?.({
                currentStep,
                index: steps.indexOf(currentStep),
                total: steps.length,
                goBack,
                goForward,
              })}
            </CSSTransition>
          </TransitionGroup>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseModal}
          >
            {steps.indexOf(currentStep) > 0 ? 'Volver' : 'Cerrar'}
          </button>
        </div>
      </div>
    </ModalStepsContext.Provider>
  )
}

type StepProps = {
  step: string
}

export const Step: React.FC<StepProps> = ({ step, children }) => {
  const { currentStep } = useModalStepContext()
  if (currentStep !== step) return null
  return <div>{children}</div>
}

export const NextButton: React.FC<React.ComponentProps<'button'>> = ({
  children,
  onClick,
  type = 'button',
  ...rest
}) => {
  const { goForward } = useModalStepContext()
  const handleClick = useCallback(
    event => {
      goForward()
      onClick?.(event)
    },
    [goForward, onClick],
  )

  return (
    <button onClick={handleClick} type={type} {...rest}>
      {children}
    </button>
  )
}

export const PrevButton: React.FC<React.ComponentProps<'button'>> = ({
  children,
  onClick,
  type = 'button',
  ...rest
}) => {
  const { goBack } = useModalStepContext()
  const handleClick = useCallback(
    event => {
      goBack()
      onClick?.(event)
    },
    [goBack, onClick],
  )

  return (
    <button onClick={handleClick} type={type} {...rest}>
      {children}
    </button>
  )
}

export default ModalSteps
