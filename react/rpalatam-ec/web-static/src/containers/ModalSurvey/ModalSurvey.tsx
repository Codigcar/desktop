import React, { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'

import './modalSurvey.css'
import ModalSteps, { Step } from '../../components/eModal/modalSteps'
import Icon from '../../system/icon'
import Notification from '../../system/notification'
import { SurveyTemplate, updateSurveyState } from '../../tools/surveys'
import { isEmptyObject } from '../../tools/tools'

type Props = {
  survey: SurveyTemplate
  modalRef: any
}

const ModalSurvey: React.FC<Props> = ({ survey, modalRef }) => {
  const submitSurvey = useCallback(
    values => {
      Notification.success({
        content: 'Gracias por su participación',
        duration: 3,
      })
      updateSurveyState(survey.surveyName, 'completed', values)
      modalRef.remove()
    },
    [modalRef, survey.surveyName],
  )

  const surveySteps = useMemo(() => {
    const keys = new Set(survey.questions.map(({ key }) => `answer-${key}`))
    return Array.from(keys)
  }, [survey])

  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    values,
    errors,
  } = useFormik({
    onSubmit: submitSurvey,
    initialValues: {},
    validate: values => {
      const errors = {}
      survey.questions.forEach((_, i) => {
        const index = i + 1
        if (
          (!values[`answer-${index}`] && survey.questions[i].required) ||
          (Array.isArray(values[`answer-${index}`]) &&
            values[`answer-${index}`].length === 0 &&
            survey.questions[i].required)
        ) {
          errors[`answer-${index}`] = 'empty'
        }
      })
      return errors
    },
    validateOnChange: false,
  })

  return (
    <ModalSteps
      steps={surveySteps}
      modalRef={modalRef}
      onCloseModal={() => updateSurveyState(survey.surveyName, 'skipped')}
    >
      {({ index, total, currentStep, goForward }) => {
        const isLast = index + 1 === total
        return (
          <div className="modal-survey">
            <div className="modal-survey__head">
              Encuesta <p>{`${index + 1} / ${total}`}</p>
            </div>
            <div className="modal-survey__body">
              <form onSubmit={handleSubmit}>
                {!isEmptyObject(errors) ? (
                  <p className="modal-survey__error-message">
                    Debe rellenar la encuesta correctamente
                  </p>
                ) : null}
                {survey.questions.map(({ question, options, type, key }, i) => {
                  const index = i + 1
                  return (
                    <Step step={`answer-${key}`} key={index}>
                      {type !== 'text' ? (
                        <p className="survey-question font-serif">{question}</p>
                      ) : null}
                      <div className="survey-options">
                        {type !== 'text' ? (
                          options?.map((option, j) => {
                            const optionId =
                              option.replace(/\s/g, '').toLowerCase() +
                              currentStep

                            const isSelected =
                              option === values[`answer-${index}`] ||
                              (Array.isArray(values[`answer-${index}`]) &&
                                values[`answer-${index}`].includes(option))

                            return (
                              <div key={j}>
                                <label
                                  htmlFor={optionId}
                                  className={`survey-option ${
                                    isSelected ? 'active' : ''
                                  }`}
                                >
                                  <div className="survey-option__icon">
                                    {isSelected ? (
                                      <Icon
                                        type="ios-checkmark"
                                        style={{
                                          fontSize: 18,
                                          color: '#f2f2f2',
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                  {option}
                                </label>
                                <input
                                  id={optionId}
                                  type={type}
                                  name={`answer-${index}`}
                                  value={option}
                                  onChange={event => {
                                    handleChange(event)
                                    if (!isLast) goForward()
                                  }}
                                />
                              </div>
                            )
                          })
                        ) : (
                          <div>
                            <p className="survey-option__subtext">{question}</p>
                            <textarea
                              className="survey-option__textarea"
                              name={`answer-${index}`}
                              onChange={event => {
                                const parsedValue = event.target.value
                                  .replace(/^\s/, '')
                                  .replace(/\s{2,}/g, ' ')
                                setFieldValue(event.target.name, parsedValue)
                              }}
                              value={values[`answer-${index}`]}
                            />
                          </div>
                        )}
                      </div>
                    </Step>
                  )
                })}
                <div className="modal-survey__paginator">
                  {isLast ? (
                    <button type="submit" className="paginate-option next">
                      Enviar
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        )
      }}
    </ModalSteps>
  )
}

export default ModalSurvey
