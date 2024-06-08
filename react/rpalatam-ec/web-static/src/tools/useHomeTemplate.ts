import { useContext, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppContext } from '../context/app'
import type { RootState } from '../store/reducers'

type Template = {
  active: boolean
  data: Record<string, boolean | string>
  includeToEnd?: boolean
  index: number
}

const useHomeTemplate = () => {
  const context = useContext(AppContext)
  const { config } = useSelector((state: RootState) => ({
    config: state.configBrand,
  }))

  const template = useMemo(() => {
    const categories = context.categories.filter(
      ({ active, key }) => active && key !== 'portada',
    )
    const sections: Template[] = categories.map((category, index) => ({
      active: true,
      data: {
        category: category.key,
        layout: 'magazine',
        media: true,
        share: true,
        title: category.label,
        type: 'section',
      },
      includeToEnd: true,
      index: 100 + index * 2,
    }))

    const ads: Template[] = config.ads.home
      .filter(ad => ad.index > 100)
      .filter((_, index) => index < sections.length - 1)
      .map(ad => ({
        active: true,
        data: ad.data,
        includeToEnd: true,
        index: ad.index,
      }))
    ads.forEach((ad, index) => {
      sections.splice(1 + index * 2, 0, ad)
    })

    return sections
  }, [config.ads.home, context.categories])

  return config.main === '/' ? template : undefined
}

export default useHomeTemplate
