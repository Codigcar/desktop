import logger from "../logger"

type IRama = {
  name: string
  active_day: number[]
  rama: number
}

// lun=1
// mar=2
// mie=3
// jue=4
// vie=5
// sab=6
// do=7

class BranchesRandom {
  static instance: BranchesRandom
  private rama: IRama
  // private rama: number

  constructor() {
    this.rama = {
      name: '',
      active_day: [],
      rama: 0,
    }
    // this.rama = 0
  }

  static getInstance() {
    if (!this.instance) this.instance = new BranchesRandom()
    return this.instance
  }

  getRamaAleatoria() {
    const maximo = 5
    const valorAleatorio = Math.floor(Math.random() * (maximo - 1)) + 1
    // const valorAleatorio = 2
    logger.debug('🚀 ~ file: random.ts:23 ~ BranchesRandom ~ getValorAleatorio ~ valorAleatorio:',JSON.stringify(valorAleatorio))

    switch (valorAleatorio) {
      case 1:
        this.setRama1()
        break
      case 2:
        this.setRama2()
        break
      case 3:
        this.setRama2()
        break
      case 4:
        this.setRama4()
      default:
        break
    }

    return this.rama
  }

  setRama1() {
    this.rama = {
      name: 'rama1',
      active_day: [0, 1, 3, 5],
      rama: 1,
    }
  }

  setRama2() {
    // this.rama = {
    //   name: 'rama2',
    //   active_day: [0, 1, 5],
    //   rama: 2,
    // }
    this.rama = {
      name: 'rama1',
      active_day: [0, 1, 3, 5],
      rama: 1,
    }
  }

  setRama4() {
    // this.rama = {
    //   name: 'rama4',
    //   active_day: [0, 1, 5],
    //   rama: 4,
    // }
    this.rama = {
      name: 'rama1',
      active_day: [0, 1, 3, 5],
      rama: 1,
    }
  }
}

export default BranchesRandom
