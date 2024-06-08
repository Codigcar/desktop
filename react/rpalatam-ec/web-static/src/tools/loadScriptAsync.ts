type Script = {
  name: string
  url: string
  type?: string
}

type ScriptPromise = {
  promise: any
  resolve: any
  reject: any
} & Script

const scriptsAsync: ScriptPromise[] = []
let isLoading = false
let index = 0

const loadScriptAsync = () => {
  if (isLoading) return
  isLoading = true
  // eslint-disable-next-line
  const { url, resolve, reject, type } = scriptsAsync[index++];
  const script = document.createElement('script')
  script.async = true
  script.src = url
  if (type) {
    script.type = type
  }
  script.onerror = (): void => {
    isLoading = false
    reject()
    if (scriptsAsync.length > index) {
      loadScriptAsync()
    }
  }
  script.onload = (): void => {
    isLoading = false
    resolve(true)
    if (scriptsAsync.length > index) {
      loadScriptAsync()
    }
  }
  document.body.appendChild(script)
}

export const addScriptAsync = (props: Script): Promise<any> => {
  const script = scriptsAsync.find(elm => elm.name === props.name)
  if (!script) {
    const newScript: ScriptPromise = {
      ...props,
      resolve: null,
      reject: null,
      promise: null,
    }
    const promise = new Promise((resolve, reject) => {
      newScript.resolve = resolve
      newScript.reject = reject
    })
    newScript['promise'] = promise
    scriptsAsync.push(newScript)
    loadScriptAsync()
    return promise
  }
  return script.promise
}
