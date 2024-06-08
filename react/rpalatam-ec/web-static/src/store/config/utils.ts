import type { Section } from '../../config/brand/types'

export function getCategoriesWithDefaultStyles(
  categories: Section[],
  defaultProps,
) {
  return categories.map(category => {
    return {
      default: { card: defaultProps.card },
      template: defaultProps.template,
      ...category,
    }
  })
}

export function getTopNavigatorFromCategories(sections: Section[]) {
  return sections.map((category, index) => ({
    ...category,
    active: index < 10,
    required: category.key === 'portada',
  }))
}
