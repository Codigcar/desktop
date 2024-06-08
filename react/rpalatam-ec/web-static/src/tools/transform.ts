export function transform(el, value, fn?): void {
  if (!el) return
  function transitionend(e): void {
    fn && fn(e)
    el.removeEventListener('transitionend', transitionend)
  }
  el.addEventListener('transitionend', transitionend)
  el.style['webkitTransform'] = value
  el.style['transform'] = value
}
