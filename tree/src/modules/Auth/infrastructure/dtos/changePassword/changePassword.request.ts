export interface IChangePasswordRequest {
  username: string
  actualPassword: string
  password: string
  passwordConfirmation: string
}
