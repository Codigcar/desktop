import { ILoginRequest } from '../dtos/login'

export default interface ILoginUseCase {
  execute(body: ILoginRequest): void
}
