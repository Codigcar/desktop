let isIterable = (value) => {
  return Symbol.iterator in Object(value)
}

module.exports = {
  translate: async (json, fromLang, toLang) => {
    let file = require(`../../lang/data_${fromLang}_${toLang}.json`)
    let tmp
    if (isIterable(json)) {
      tmp = []
      file = Object.entries(file)
      for (let item of json) {
        let pos = file.findIndex((f) => f[0] === item)
        if (pos !== -1) {
          tmp.push(file[pos][1])
        } else {
          tmp.push(item)
        }
      }
    } else {
      tmp = {}
      file = Object.entries(file)
      for (let i in json) {
        let pos = file.findIndex((f) => f[0] === i)
        if (pos !== -1) {
          tmp[file[pos][1]] = json[i]
        } else {
          tmp[i] = json[i]
        }
      }
    }
    return tmp
  },
}
