import IListCoursesByStudyPlanIdResponse from '../dtos/listCoursesByStudyPlanId.response'
import IStudyPlanResponse from '../dtos/listStudyPlan.response'

export default interface IHomeRepository {
  listStudyPlan(): Promise<IStudyPlanResponse>
  listCoursesByStudyPlanId(planId: string): Promise<IListCoursesByStudyPlanIdResponse>
}
