export function getVideoFormated(data) {
  return {
    data,
    type: 'video',
  }
}

export function getPowaAttributes(item) {
  const stream = item.streams
    ?.reverse()
    .find(stream => stream.stream_type === 'mp4')
  return getVideoFormated({
    id: item._id || item.referent?.id,
    description: item.headlines?.basic, // basicVideo.description?.basic
    provider: 'powa',
    stream,
    thumb: item.promo_image?.url,
  })
}

export function getJwplayerAttributes(item) {
  const jwplayer = item.embed?.config || {}
  return getVideoFormated({
    id: jwplayer.key || '',
    account: jwplayer.account || 'gec',
    description: jwplayer.description,
    has_ads: String(jwplayer.has_ads) === '1',
    provider: 'jwplayer',
    thumb: jwplayer.thumbnail_url,
    listTitle: jwplayer.listTitle
  })
}

export function getYoutubeAttributes(item) {
  return getVideoFormated({
    id: item.id,
    provider: 'youtube',
    thumb: item.thumb,
  })
}
