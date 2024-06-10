const useLoginInteractor = () => {
  const extractAccessToken = (url: string): string | null => {
    try {
      const accessTokenParam = 'access_token='
      const start = url.indexOf(accessTokenParam)
      if (start === -1) return null

      let fromAccessToken = url.substring(start + accessTokenParam.length)
      const end = fromAccessToken.indexOf('&')
      if (end !== -1) {
        fromAccessToken = fromAccessToken.substring(0, end)
      }

      return fromAccessToken
    } catch (error) {
      console.error('Error parsing URL:', error)
      return null
    }
  }

  return { extractAccessToken }
}

export default useLoginInteractor
