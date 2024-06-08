export interface ILoginResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  id: string
  accessToken: string
  username: string
  student: Student
  firstLogin: boolean
}

export interface Student {
  id: number
  sapId: string
  name: string
  lastName: string
  email: string
  phone: string
  documentType: string
  documentNumber: string
}
