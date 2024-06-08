export function queryInclude(type: string): string[] {
  switch (type) {
    case 'cards':
      return [
        '_id',
        'canonical_url',
        'content_restrictions.content_code',
        'headlines.basic',
        'last_updated_date',
        'planning.story_length.word_count_actual',
        'promo_items.basic.url',
        'promo_items.basic_gallery.content_elements.url',
        'promo_items.basic_jwplayer.embed.config.thumbnail_url',
        'subheadlines.basic',
        'taxonomy.primary_section._id',
        'taxonomy.primary_section.name',
        'taxonomy.primary_section.path',
        'type',
      ]
    default:
      return []
  }
}

export function getQueryBySection(section: string): string {
  const path = section.replace(/\//g, '\\/')
  let query =
    'type:story+AND+revision.published:true+AND+NOT+taxonomy.tags.slug:"no-app"'
  switch (section) {
    case 'portada':
    case 'ultimo':
      break
    case 'politica-economia':
      query += '+AND+taxonomy.primary_section._id:(?politica*+OR+?economia*)'
      break
    case 'suscriptor-digital':
    case 'plusg':
      query += '+AND+content_restrictions.content_code:"premium"'
      break
    default:
      query += `+AND+taxonomy.primary_section._id:(\\/${path}*)`
      break
  }
  return query
}

export function getQueryCategories(): string {
  const query = '{"hierarchy":"menu-default"}'
  return query
}

type QuerySearchParams = {
  dateFrom?: string
  dateTo?: string
  section?: string
  term?: string
}

export function getQuerySearch({
  dateFrom,
  dateTo,
  section,
  term = '',
}: QuerySearchParams): string {
  const searchTerm = term.toLowerCase().replace(' ', '+')
  let query = `type:story+AND+revision.published:true+AND+NOT+taxonomy.tags.slug:"no-app"+AND+("${searchTerm}")`

  if (section) {
    query += `+AND+taxonomy.primary_section._id:(?${section}*)`
  }

  if (dateFrom && dateTo) {
    query += `+AND+last_updated_date:{${dateFrom} TO ${dateTo}}`
  } else if (dateFrom) {
    query += `+AND+last_updated_date:{${dateFrom} TO *}`
  }

  return query
}
