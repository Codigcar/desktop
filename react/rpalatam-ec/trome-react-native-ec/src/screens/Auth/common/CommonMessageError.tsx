import React from 'react'

import View from '../../../components/box/View'
import Typography from '../../../components/typography'

const { Paragraph } = Typography

type CommonMessageErrorProps = {
  error?: string
}

const CommonMessageError: React.FC<CommonMessageErrorProps> = ({ error }) => {
  if (!error) return null
  return (
    <View px="1.5">
      <Paragraph
        color="danger"
        fontSize="sm"
        fontWeight="bold"
        textAlign="center">
        {error}
      </Paragraph>
    </View>
  )
}

export default CommonMessageError
