import React from 'react'
import Icon from '../../system/icon'

interface NewsletterProps {
  brand: string
  category: any
  isActive: boolean
  saving: boolean
  handleClick: (event: any) => void
}
// selectNewsletter -> handleClick
const NewsletterItem: React.FC<NewsletterProps> = props => {
  const { brand, category, isActive, saving, handleClick } = props
  return (
    <div className="eco newsletter__list-category" key={category.code}>
      {brand === 'gestion' ? (
        <>
          <input
            defaultChecked={isActive}
            onClick={handleClick}
            value={category.code}
            type="checkbox"
            disabled={saving}
          />
          <figure>
            <img
              src={`${process.env.PUBLIC_URL}/brands/gestion/placeholderBox.svg`}
              alt={category.name}
              style={{
                backgroundImage: `url("${category.image.replace(
                  'http:',
                  'https:',
                )}")`,
              }}
            />
            <figcaption>
              <div className="newsletter__list-name">{category.name}</div>
              <div className="newsletter__list-icon">
                <Icon type="ios-checkmark" />
              </div>
            </figcaption>
          </figure>
        </>
      ) : (
        <>
          <div className="newsletter-content">
            <div className="newsletter-header">
              <h3 className="font-serif">{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <figure>
              <img
                src={category.image.replace('http:', 'https:')}
                alt={category.name}
              />
            </figure>
          </div>
          <button
            className={isActive ? 'active' : undefined}
            value={category.code}
            type="button"
            onClick={handleClick}
            disabled={saving}
          >
            {isActive ? (
              <>
                <Icon type="md-remove_circle_outline" /> Suscrito
              </>
            ) : (
              <>
                <Icon type="md-add_circle_outline" /> Suscribirme
              </>
            )}
          </button>
        </>
      )}
    </div>
  )
}

export default NewsletterItem
