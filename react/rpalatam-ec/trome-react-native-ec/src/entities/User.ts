type Address = {
  district?: string
  province?: string
  department?: string
  country?: string
}

export class User {
  public id?: string
  public email?: string
  public username?: string
  public first_name?: string
  public last_name?: string
  public second_last_name?: string
  public date_of_birth?: string
  public gender?: string
  public mobile_phone?: string
  public address?: Address
  public user_metadata?: Record<string, string>

  constructor(props: User) {
    Object.assign(this, props)
  }
}
