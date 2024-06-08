/* eslint-disable @typescript-eslint/camelcase */
import { addScriptAsync } from './loadScriptAsync'
import bbcImage from './../images/bbc.jpg'

declare global {
  interface Window {
    s_bbcws: any
    category: string
  }
}

const banner = () => {
  const img = document.createElement('img')
  img.src = bbcImage
  img.classList.add('bbc-image')
  return img
}

export const enable = () => {
  const NodeArray = Array.from(document.querySelectorAll('.bbc-tag'))
  NodeArray.forEach(node => node.appendChild(banner()))
}
;(w => {
  w.s_bbcws = w.s_bbcws || {}
  w.s_bbcws.prop25 = 'elcomercio.pe'
  w.s_bbcws.prop45 = window.category
  addScriptAsync({
    name: 'BBC',
    url:
      'https://news.files.bbci.co.uk/ws/js/vendor/site_catalyst/s_code_bbcws.js',
  })
})(window)
