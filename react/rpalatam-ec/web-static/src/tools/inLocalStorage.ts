export default function inLocalStorage(value: string, defaultValue) {
  const setValue = argValue => {
    Storage && localStorage.setItem(value, JSON.stringify(argValue))
  }
  const destroyValue = () => {
    Storage && localStorage.removeItem(value)
  }
  const initialize = () => {
    if (Storage) {
      localStorage.setItem(value, JSON.stringify(defaultValue))
    }
  }
  return [
    JSON.parse(localStorage.getItem(value) + ''),
    initialize,
    setValue,
    destroyValue,
  ]
}
