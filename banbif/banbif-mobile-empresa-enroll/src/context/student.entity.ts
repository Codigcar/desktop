
export interface IStudent {
  id: number | null
  sapId: string | null
  name: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  documentType: string | null
  documentNumber: string | null
  accessToken: string | null
}

class StudentEntity {
  
  constructor(
    readonly mfa_token: string,
    readonly name: string,
  ) {}

  static fromJson({ data }: any): StudentEntity {
    return new StudentEntity(
      data.student.id,
      '',
    )
  }
}

export default StudentEntity
