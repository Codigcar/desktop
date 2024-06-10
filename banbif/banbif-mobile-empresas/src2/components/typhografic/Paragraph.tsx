import React from 'react'
import Text, { TextProps2 } from './Text'

const Paragraph: React.FC<TextProps2> = (props) => {
  return (
    <Text
    color="trueGray-900"
    {...props}
    />
  )
}

export default Paragraph
