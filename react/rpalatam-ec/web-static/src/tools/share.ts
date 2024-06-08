const share = async (url: string): Promise<void> => {
  if (!!navigator.share) return navigator.share({ url })
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: 'onShare', content: { title: '', url } }),
  )
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: 'share.SHARE', payload: { url } }),
  )
}

const Share = { share }
export default Share
