import { useEffect, useRef, useState } from 'react'

interface Props {
  hasMore: boolean
  loadMore(page: number): void
  page?: number
  threshold?: number
  useWindow?: boolean
}

function useInfiniteScroll(props: Props): React.RefObject<any> {
  const ref = useRef<any>(null)
  const [page, setPage] = useState(props.page || 0)
  console.log(ref)
  /* function getParentElement(el): HTMLElement | null {
    return el?.parentNode
  }

  function detachScrollListener(): void {
    let scrollEl: Window | HTMLElement | null = window
    if (!props.useWindow) {
      scrollEl = getParentElement(ref.current)
    }
    console.log('detachScrollListener')
    scrollEl?.removeEventListener('scroll', scrollListener)
  }

  function attachScrollListener(): void {
    const parentElement = getParentElement(ref.current)

    if (!props.hasMore || !parentElement) {
      return
    }

    let scrollElm: Window | HTMLElement = window
    if (!props.useWindow) {
      scrollElm = parentElement
    }
    console.log('attachScrollListener')
    scrollElm.addEventListener('scroll', scrollListener)
  }

  function scrollListener(): void {
    const el = ref
    const scrollEl = window
    const parentNode = getParentElement(el.current)

    let offset
    if (props.useWindow) {
      const doc =
        document.documentElement || document.body.parentNode || document.body
      const scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : doc.scrollTop
      offset = calculateOffset(el.current, scrollTop)
    } else {
      offset =
        el.current!.scrollHeight -
        parentNode!.scrollTop -
        parentNode!.clientHeight
    }
    if (offset < Number(props.threshold) && el.current?.offsetParent !== null) {
      detachScrollListener()
      props.loadMore(page + 1)
      setPage(page + 1)
      console.log('pageLoaded2', page)
    }
  }

  function calculateOffset(el, scrollTop): number {
    if (!el) return 0

    return (
      calculateTopPosition(el) +
      (el.offsetHeight - scrollTop - window.innerHeight)
    )
  }

  function calculateTopPosition(el): number {
    if (!el) return 0
    return el.offsetTop + calculateTopPosition(el.offsetParent)
  }

  useEffect(() => {
    attachScrollListener()
    return (): void => {
      detachScrollListener()
    }
  }, [page]) */

  return ref
}

export default useInfiniteScroll
