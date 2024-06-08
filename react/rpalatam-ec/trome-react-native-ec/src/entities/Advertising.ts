export class Advertising {
  public readonly id!: string
  public size?: string
  public sizes?: string[]

  constructor(props: Advertising) {
    Object.assign(this, props)
  }
}
