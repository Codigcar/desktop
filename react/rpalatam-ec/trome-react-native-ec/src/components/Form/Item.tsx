import React from 'react'

import * as styles from './styles'
import IconAlertCircle from '../../assets/icons/elcomercio/alert-circle.svg'
import { App } from '../../utils/config'
import Box from '../box'
import Typography from '../typography'
import type { ItemProps } from './types'

const { View } = Box
const { Paragraph } = Typography

const Item: React.FC<ItemProps> = ({ children, error, label }) => {
  return (
    <View {...styles.container}>
      {!label ? null : <Paragraph {...styles.label}>{label}</Paragraph>}
      {children}
      {!error ? null : (
        <Paragraph
          color="danger"
          fontSize="sm"
          fontWeight="medium"
          {...styles.error}>
          {error}{' '}
          {App.key === 'elcomercio' ? (
            <IconAlertCircle fill="#E30000" width={14} height={14} />
          ) : null}
        </Paragraph>
      )}
    </View>
  )
}

export default Item
