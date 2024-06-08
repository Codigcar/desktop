declare global {
  interface Window {
    mozRequestAnimationFrame
    mozCancelAnimationFrame
  }
}

export const requestAnimFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback): void {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

export const cancelAnimFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame
