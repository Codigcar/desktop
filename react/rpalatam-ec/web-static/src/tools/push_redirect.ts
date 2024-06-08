import { getDomain } from './tools'

const domain = getDomain()
const rgx = new RegExp(`^https?://${domain}`)

export function parseURL(url: string | null) {
  const noMatch = { status: false, url }

  if (!url || !rgx.test(url)) return noMatch

  try {
    const { pathname } = new URL(url)
    const isStory = /-noticia\/$/.test(pathname)
    const isTag = /^\/noticias\//.test(pathname)
    if (isStory || isTag) return { status: true, url: pathname }
    return noMatch
  } catch (_) {
    return noMatch
  }
}
