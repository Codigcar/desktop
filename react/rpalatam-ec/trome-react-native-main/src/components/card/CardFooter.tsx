import React from 'react'

import CardActions from './CardActions'
import { Story } from '../../entities/Story'
import { App } from '../../utils/config'
import { timeSince } from '../../utils/tools'
import Box from '../box'
import PremiumBadge from '../premiumBadge'
import Typography from '../typography'

const { View } = Box
const { Paragraph } = Typography

const CardFooter: React.FC<Story> = (story) => {
  const isPremium = story.restrictions === 'premium'

  return (
    <View>
      <View flexDirection="row" justifyContent="space-between" pt="0.5" px="1">
        <Box.View flexDirection="row" alignItems="center">
          {!story.last_updated_date ? null : (
            <Paragraph fontSize="sm" color="text">
              {timeSince(story.last_updated_date)}
            </Paragraph>
          )}
          {!story.reading_time ? null : (
            <React.Fragment>
              <Paragraph fontSize="sm" color="text">
                {' ∙ '}
              </Paragraph>
              <Paragraph fontSize="sm" color="text">
                {story.reading_time} min de lectura
              </Paragraph>
            </React.Fragment>
          )}
          {isPremium && App.key === 'gestion' && (
            <PremiumBadge brand="gestion" />
          )}
        </Box.View>
        <CardActions {...story} />
      </View>
      {isPremium && App.key === 'elcomercio' && (
        <Box.View mt="0.5" px="1">
          <PremiumBadge brand="elcomercio" />
        </Box.View>
      )}
    </View>
  )
}

export default CardFooter
