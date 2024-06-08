import { ViewProps } from 'react-native'
import View from '../box/View'
import { Theme } from '../../theme'
import { BoxProps } from '@shopify/restyle'

type Props = {
  children: JSX.Element
}

const CardShadow: React.FC<Props & ViewProps & BoxProps<Theme>> = ({
  children,
  ...rest
}) => {
  return (
    <View
      bg="white"
      mb="1"
      borderRadius="xl"
      padding="0.75"
      shadowColor="black"
      shadowOffset={{
        width: 0,
        height: 2,
      }}
      shadowOpacity={0.25}
      shadowRadius={3.84}
      elevation={5}
      {...rest}>
      {children}
    </View>
  )
}

export default CardShadow
