const fetch = require('node-fetch')

function isPromise(value) {
  return !!value && typeof value['then'] === 'function'
}

let customFetchGenerator =
  (log) =>
  async (input, init = {}) => {
    const fetchObject = await fetch(input, init)
    return new Promise((resolve) => {
      let temp = {}
      for (const key in fetchObject) {
        temp[key] = fetchObject[key]
        if (typeof fetchObject[key] === 'function') {
          if (isPromise(fetchObject[key])) {
            temp[key] = async () => {
              const result = await fetchObject[key]()
              log(input, init, result)
              return result
            }
          } else {
            temp[key] = () => {
              const result = fetchObject[key]()
              log(input, init, result)
              return result
            }
          }
        }
      }
      resolve(temp)
    })
  }

module.exports = customFetchGenerator
