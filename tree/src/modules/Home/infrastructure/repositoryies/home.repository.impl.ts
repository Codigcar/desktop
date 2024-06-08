import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import IListCoursesByStudyPlanIdResponse from '../../domain/dtos/listCoursesByStudyPlanId.response'
import IStudyPlanResponse from '../../domain/dtos/listStudyPlan.response'
import IHomeRepository from '../../domain/repositories/home.repository'

class HomeRepository implements IHomeRepository {
  private http: IHttpClient
  static instance: HomeRepository

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new HomeRepository()
    }
    return this.instance
  }

  async listStudyPlan(): Promise<IStudyPlanResponse> {
    const response = await this.http.get<IStudyPlanResponse>('/curricula')
    return response
  }

  async listCoursesByStudyPlanId(planId: string): Promise<IListCoursesByStudyPlanIdResponse> {
    const response = await this.http.get<IListCoursesByStudyPlanIdResponse>(`/courses?curriculaId=${planId}`)
    return response
  }
}

export default HomeRepository
