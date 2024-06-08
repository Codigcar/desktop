import Firebase from './firebase'

const isProd = process.env.REACT_APP_ENVIRONMENT === 'production'

export function userHasPendingSurvey(surveyName: string): boolean {
  const localSurveyState = window.localStorage.getItem(surveyName)
  if (!localSurveyState) return true
  const surveyState = JSON.parse(localSurveyState)
  if (surveyState.status === 'completed') return false
  if (surveyState.status === 'skipped' && surveyState.times >= 2) return false

  const timeToShowSurvey = isProd
    ? 1000 * 60 * 60 * 24 // 24 hours
    : 1000 * 60 * 5 // 5 minutes

  const lastDate = new Date(surveyState.date)
  const currentDate = new Date()
  return currentDate.getTime() - lastDate.getTime() > timeToShowSurvey
}

export type Survey = {
  date: Date
  status: 'skipped' | 'completed'
  times: number
}

export function trackSurvey(action: 'open' | 'skip' | 'complete') {
  const surveyId = 'jNg9OYNKSarXkK4vH3Tg'
  window.dataLayer?.push({
    event: 'SuscriptionActivity',
    category: 'PWA_Surveys',
    action: `pwa_surveys_${action}`,
    label: surveyId,
    value: 0,
  })
}

export function updateSurveyState(
  surveyName: string,
  status: Survey['status'],
  results?: any,
) {
  trackSurvey(status === 'completed' ? 'complete' : 'skip')
  const localData = window.localStorage.getItem(surveyName)
  if (status === 'completed') {
    const surveyRef = isProd ? 'surveys-answers_prod' : 'surveys-answers_dev'
    const surveyId = 'jNg9OYNKSarXkK4vH3Tg'
    try {
      Firebase.connectDB(surveyRef).add({
        ...results,
        survey_id: surveyId,
        survey_date: new Date(),
      })
    } catch (error) {
      console.log(error)
    }
  }
  window.localStorage.setItem(
    surveyName,
    JSON.stringify({
      date: new Date(),
      status,
      times: localData ? JSON.parse(localData).times + 1 : 1,
    }),
  )
}

export type SurveyTemplate = {
  questions: {
    question: string
    key: string
    options?: string[]
    type: 'radio' | 'checkbox' | 'text'
    required: boolean
  }[]
  surveyName: string
}

export const surveyImprovements: SurveyTemplate = {
  surveyName: 'survey_improvements',
  questions: [
    {
      key: 'user-experience',
      question: '¿Cómo calificaría su experiencia con la app de El Comercio?',
      options: ['Excelente', 'Buena', 'Aceptable', 'Regular', 'Mala'],
      type: 'radio',
      required: true,
    },
    {
      question:
        '¿Cuál considera fue su mayor problema durante el uso con la app?',
      key: 'problem',
      options: [
        'Experimenté fallas',
        'La aplicación carecía de lo que necesitaba',
        'La aplicación es confusa',
        'La aplicación es poco atractiva',
        'Ninguno',
      ],
      type: 'radio',
      required: true,
    },
    {
      question: '¿Qué es lo que más le gusta de la aplicación?',
      key: 'most-like',
      options: ['Navegación', 'Velocidad', 'Funcionalidad', 'Contenidos'],
      type: 'radio',
      required: true,
    },
    {
      question: '¿Qué es lo que menos le gusta de la aplicación?',
      key: 'most-dislike',
      options: [
        'Velocidad',
        'Funcionalidad',
        'Oferta de Contenidos',
        'Pocas novedades',
      ],
      type: 'radio',
      required: true,
    },
    {
      question: '¿Recomendaría nuestra aplicación?',
      key: 'recommends',
      options: [
        'Siempre la recomiendo',
        'Es muy probable',
        'Es probable',
        'Es poco probable',
        'Nunca',
      ],
      type: 'radio',
      required: true,
    },
    {
      question: '¿Por qué recomendaría o no nuestra aplicación?',
      key: 'recommends',
      type: 'text',
      required: false,
    },
  ],
}
