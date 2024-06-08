export interface Section {
  /**
   * @key ID usado para hacer fetch de la sección y como
   * valor por default de la sección en Ad Manager
   */
  key: string
  /**
   * @label Título de la sección
   */
  label: string
  /**
   * @path URL de la sección
   */
  path: string
  /**
   * @ad Nombre distinto al key para Ad Manager
   */
  ad?: string
}

export type Sections = { [key: string]: Section }
