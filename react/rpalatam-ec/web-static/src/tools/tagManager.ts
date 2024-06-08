export const addTagManager = (tagManagerCode): void => {
  const w = window,
    d = document,
    s = 'script',
    l = 'dataLayer',
    i = tagManagerCode
  w[l] = w[l] || []
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  })
  const f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l !== 'dataLayer' ? '&l=' + l : ''
  j.async = true
  const dev =
    window.location.hostname.includes('.dev.') &&
    window.location.hostname.includes('.trome.')
      ? '&gtm_auth=P42Dg7NaRKCo7SCr40L1Rg&gtm_preview=env-14&gtm_cookies_win=x'
      : ''
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl + dev
  f.parentNode?.insertBefore(j, f)
}
