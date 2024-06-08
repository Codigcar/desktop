import AnimatedDotsCarousel from 'react-native-animated-dots-carousel'
import { View } from '../box'

const LENGTH = 10

type Props = {
  index: number
  maxIndicators?: number
  length: number
}
const CustomDots: React.FC<Props> = ({ index, maxIndicators = 4, length }) => {
  return (
    <View height={10} alignItems="center" justifyContent="center">
      <AnimatedDotsCarousel
        length={length}
        currentIndex={index}
        maxIndicators={length}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: '#BD1714',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: '#BEBDBC',
          margin: 3,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
    </View>
  )
}

export default CustomDots

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
// })
