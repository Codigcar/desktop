/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import Icon from '../../system/icon'

interface Props {
  children: React.ReactNode
  loadMore(page: number): void
  useWindow?: boolean
  hasMore?: boolean
  pageStart?: number
  threshold?: number
  /**
   * Usado en el useEffect como segundo argumento
   * para prevenir el efecto si el valor no
   * ha cambiado
   */
  isChanged?: any
  scrolling?: (scrollTop: number) => void
}

const InfiniteScroll: React.FC<Props> = props => {
  const [page, setPage] = useState(props.pageStart || 0)
  const scrollComponent = useRef<HTMLDivElement>(null)

  function getParentElement(el): HTMLElement | null {
    /* const scrollParent = getScrollParent && getScrollParent()
    if (scrollParent !== null) {
      return scrollParent
    } */
    return el?.parentNode
  }

  function detachScrollListener(): void {
    let scrollEl: Window | HTMLElement | null = window
    if (!props.useWindow) {
      scrollEl = getParentElement(scrollComponent.current)
    }
    scrollEl?.removeEventListener('scroll', scrollListener)
  }

  function attachScrollListener(): void {
    const parentElement = getParentElement(scrollComponent.current)

    if (!props.hasMore || !parentElement) {
      return
    }

    let scrollElm: Window | HTMLElement = window
    if (!props.useWindow) {
      scrollElm = parentElement
    }
    scrollElm.addEventListener('scroll', scrollListener)
  }

  function scrollListener(): void {
    const el = scrollComponent
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
      props.scrolling?.(scrollTop)
    } else {
      offset =
        el.current!.scrollHeight -
        parentNode!.scrollTop -
        parentNode!.clientHeight
      props.scrolling?.(parentNode!.scrollTop)
    }
    // element is visible
    if (offset < Number(props.threshold) && el.current?.offsetParent !== null) {
      detachScrollListener()
      props.loadMore(page + 1)
      setPage(page + 1)
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
  }, [props.isChanged || props.children])

  return (
    <div ref={scrollComponent}>
      {props.children}
      {(props.hasMore ? true : null) && (
        <div style={{ textAlign: 'center', paddingBottom: '1em' }}>
          <Icon type="loading" style={{ fontSize: '1.5em' }} />
        </div>
      )}
    </div>
  )
}

InfiniteScroll.defaultProps = {
  threshold: 250,
}

export default InfiniteScroll
