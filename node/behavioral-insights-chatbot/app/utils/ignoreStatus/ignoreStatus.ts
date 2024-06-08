type IClass = {
  waId: string
  status: string[]
}

class IgnoreStatus {
  static instance: IgnoreStatus
  private phoneNumbers: Map<string, string[]>

  constructor() {
    //   this.lista = []
    this.phoneNumbers = new Map<string, string[]>()
  }

  static getInstance() {
    if (!this.instance) this.instance = new IgnoreStatus()
    return this.instance
  }

  add(waId: string, data: string | string[]): void {
    if (this.phoneNumbers.has(waId)) {
      // Si el número de teléfono ya existe en la lista, agregamos los datos al array existente
      const existingData = this.phoneNumbers.get(waId) || []
      if (Array.isArray(data)) {
        existingData.push(...data)
      } else {
        existingData.push(data)
      }
      this.phoneNumbers.set(waId, existingData)
    } else {
      // Si el número de teléfono no existe en la lista, lo agregamos con los datos proporcionados
      if (Array.isArray(data)) {
        this.phoneNumbers.set(waId, data)
      } else {
        this.phoneNumbers.set(waId, [data])
      }
    }
  }

  getList(): Map<string, string[]> {
    return this.phoneNumbers
  }

  getDataByPhoneNumber(phoneNumber: string): string[] | undefined {
    return this.phoneNumbers.get(phoneNumber);
  }
}

export default IgnoreStatus
