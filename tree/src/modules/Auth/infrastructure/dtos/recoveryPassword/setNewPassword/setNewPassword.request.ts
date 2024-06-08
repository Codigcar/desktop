export interface ISetNewPasswordRequest {
  email: string
  code: string
  password: string
  passwordConfirmation: string
}
