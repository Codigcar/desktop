import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import GetListCoursesByStudyPlanIdUseCase from '../../application/getListCoursesByStudyPlanId.useCase'
import { ICourseByStudyPlanId } from '../../domain/dtos/listCoursesByStudyPlanId.response'
import { useStudyPlan } from '../../../../context'

const useHomeInteractor = () => {
  const { studyPlanSelect, setterCourseList } = useStudyPlan()
  const [isLoading, setIsLoading] = useState(false)
  const [coursesList, setCoursesList] = useState<ICourseByStudyPlanId[]>([])

  const fetchListCoursesByStudyPlanId = async (planId: string) => {
    setIsLoading(true)
    try {
      const response =
        await GetListCoursesByStudyPlanIdUseCase.getInstance().execute(planId)
      if (!response.success) throw new Error(response.message)
      setterCourseList(response.data)
      return { status: true, data: response.data }
    } catch (error: any) {
      console.log("🚀 -------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: Home.interactor.ts:22 ~ fetchListCoursesByStudyPlanId ~ error:", error)
      console.log("🚀 -------------------------------------------------------------------------------🚀")
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(!studyPlanSelect) return
    fetchListCoursesByStudyPlanId(String(studyPlanSelect.id)).then(
      ({ status, data }) => {
        if (!status) return
        setCoursesList(data ?? [])
      },
    )
  }, [studyPlanSelect])

  return {
    isLoading,
    fetchListCoursesByStudyPlanId,
    coursesList,
  }
}

export default useHomeInteractor
