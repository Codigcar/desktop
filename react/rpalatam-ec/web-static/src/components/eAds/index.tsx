/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import Observer from '@researchgate/react-intersection-observer'

import { addScriptAsync } from '../../tools/loadScriptAsync'
import { getBrand } from '../../tools/tools'

const brand = getBrand()

declare global {
  interface Window {
    googletag: any
  }
}

type Template = 'home' | 'post' | 'sect'

interface Props {
  className?: string
  id: string
  position: string
  root?: string
  section: string
  sizes: [number, number] | [number, number][]
  template: Template
}

const EAds: React.FC<Props> = ({
  className,
  id,
  position,
  root,
  section,
  sizes,
  template,
}) => {
  const [intersecting, setIntersecting] = useState(false)
  const slot = React.useMemo(() => {
    let name = `/28253241/${brand}/pwa/${template}/${section}/${position}`
    if (brand === 'trome') {
      const temp = template === 'home' ? 'sect' : template
      name = `/28253241/trome/pwa/${temp}/default/${position}`
    }
    return { name, sizes }
  }, [brand, position, section, template])

  const options = {
    onChange: handleIntersection,
    rootMargin: '200px 0%',
    disabled: intersecting,
    root,
  }

  function handleIntersection({ isIntersecting }) {
    if (isIntersecting) {
      setIntersecting(true)
    }
  }

  useEffect(() => {
    let refSlot
    if (intersecting) {
      addScriptAsync({
        name: 'GoogleTag',
        url: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
      }).then(() => {
        const googletag = window.googletag
        googletag.cmd.push(function () {
          googletag.pubads().setCentering(true)
          refSlot = googletag.defineSlot(slot.name, slot.sizes, id)
          refSlot?.addService(googletag.pubads())
          googletag.display(id)
          googletag.pubads()
          googletag.enableServices()
        })
      })
    }
    return () => {
      window.googletag?.destroySlots?.([refSlot])
    }
  }, [id, intersecting, slot])

  const classes = classNames('e-ads', className)

  return (
    <div className={classes}>
      <Observer {...options}>
        <div id={id} className="e-ads-content" />
      </Observer>
    </div>
  )
}

export default React.memo(EAds)
