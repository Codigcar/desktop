function queryInclude(type: string): string[] {
  switch (type) {
    case 'cards':
      return [
        'canonical_url',
        'content_restrictions.content_code',
        'credits.by._id',
        'credits.by.name',
        'credits.by.slug',
        'credits.by.image',
        'headlines.basic',
        'last_updated_date',
        'planning.story_length.word_count_actual',
        'promo_items.basic.url',
        'promo_items.basic.additional_properties.fullSizeResizeUrl',
        'promo_items.basic_gallery.content_elements.url',
        'promo_items.basic_gallery.content_elements._id',
        'promo_items.basic_video.promo_image.url',
        'promo_items.basic_video._id',
        'promo_items.basic_jwplayer.embed.config.key',
        'promo_items.basic_jwplayer.embed.config.thumbnail_url',
        'promo_items.youtube_id.content',
        'subheadlines.basic',
        'taxonomy.primary_section.name',
        'taxonomy.primary_section.path',
        'taxonomy.primary_section.referent.id',
        'taxonomy.primary_section.type',
      ]
    case 'podcastProgram':
      return [
        'headlines.basic',
        'last_updated_date',
        'promo_items.basic.additional_properties.fullSizeResizeUrl',
        'promo_items.path_mp3.content',
        'subheadlines.basic',
      ]
    case 'tvProgram':
      return [
        'headlines.basic',
        'promo_items.basic.url',
        'promo_items.basic_video._id',
        'promo_items.basic_video.promo_image.url',
        'promo_items.basic_video.streams',
        'promo_items.basic_jwplayer.embed.config.account',
        'promo_items.basic_jwplayer.embed.config.has_ads',
        'promo_items.basic_jwplayer.embed.config.key',
        'promo_items.basic_jwplayer.embed.config.thumbnail_url',
        'promo_items.youtube_id.content',
      ]
    default:
      return []
  }
}

export function getQueryPodcast(queryDefault: string): string {
  const includes = queryInclude('podcastProgram').join()
  let query = `type:story+AND+revision.published:true+AND+${queryDefault}`
  query += `&_sourceInclude=${includes},`
  return query
}

export function getQueryPortrait(section: string): string {
  const includes = queryInclude('cards').join()
  let query =
    'type:story+AND+revision.published:true+AND+NOT+taxonomy.primary_section._id:(?no-flujo)+AND+NOT+taxonomy.tags.slug:"no-app"'
  switch (section) {
    case 'portada':
    case 'ultimo':
      query += `+AND+NOT+taxonomy.primary_section._id:(?luces?vida?social*+OR+?respuestas*+OR+?provecho?recetas*)`
      break
    case 'politica-economia':
      query += `+AND+taxonomy.primary_section._id:(?politica*+OR+?economia*)`
      break
    case 'suscriptor-digital':
    case 'plusg':
      query += '+AND+content_restrictions.content_code:premium'
      break
    case 'tecnologia-e-sports':
      query += `+AND+taxonomy.primary_section._id:(?tecnologia?e-sports*)`
      break
    default:
      query += `+AND+taxonomy.primary_section._id:(?${section}*)`
      break
  }
  query += `&_sourceInclude=${includes},`
  return query
}

export function getQueryAuthor(author: string) {
  const includes = queryInclude('cards').join()
  const query = `type:story+AND+revision.published:true+AND+credits.by.slug:${author}&_sourceInclude=${includes}`
  return query
}

export function getQueryTags(tag: string): string {
  const includes = queryInclude('cards').join()
  let query = `type:story+AND+revision.published:true+AND+NOT+taxonomy.primary_section._id:(?no-flujo)+AND+NOT+taxonomy.tags.slug:"no-app"+AND+taxonomy.tags.slug:/${tag}/`
  query += `&_sourceInclude=${includes},`
  return query
}

export function getQueryTvProgram(program: string): string {
  const includes = queryInclude('tvProgram').join()
  let query = `type:story+AND+revision.published:true`
  query += `+AND+taxonomy.primary_section._id:(*${program}*)`
  query += `&_sourceInclude=${includes},`
  return query
}

export function getQueryRelatedStories(
  tags: string[],
  sectionPath: string,
): string {
  const includes = queryInclude('cards').join()
  let query = `type:story+AND+revision.published:true+AND+NOT+taxonomy.primary_section._id:(?no-flujo)+AND+NOT+taxonomy.tags.slug:"no-app"`
  query += `+AND+taxonomy.primary_section.path:"${sectionPath}"`
  query += `+AND+taxonomy.tags.slug:/${tags.join('|')}/`
  query += `&_sourceInclude=${includes},`
  return query
}
