/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-underscore-dangle */
import { addScriptAsync } from './loadScriptAsync'

declare global {
  interface Window {
    _taboola
  }
}

export function taboolaEvent(data = {}, brand, mode) {
  if (window._taboola) {
    window._taboola.push({ notify: 'newPageLoad' })
    window._taboola.push(data)
    window._taboola.push({
      mode,
      container: 'taboola-below-article-thumbnails',
      placement: 'Below Content Thumbnails PWA',
      target_type: 'mix',
    })
    return
  }
  addScriptAsync({
    name: 'Taboola',
    url: `https://cdn.taboola.com/libtrc/grupoelcomercio-${brand}/loader.js`,
  }).then(() => {
    window._taboola = window._taboola || []
    // window._taboola.push({ flush: true });
    window._taboola.push({
      mode,
      container: 'taboola-below-article-thumbnails',
      placement: 'Below Content Thumbnails PWA',
      target_type: 'mix',
    })
    window._taboola.push(data)
  })
}
