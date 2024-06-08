import { Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Card from '../card'
import { Paragraph } from '../typhografic'
import { IconCalendar, IconLocalization } from '../../assets/icons'
import { View } from '../box'
import Image from '../image'
import CustomDots from './Dots'
import { useState } from 'react'

const CustomCarousel: React.FC = () => {
  const width = Dimensions.get('window').width
  const [indexDot, setIndexDot] = useState(0)

  return (
    <View>
      <Carousel
        loop
        width={width - 30}
        height={308}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onProgressChange={(_, absoluteProgress) => {
          setIndexDot(Math.round(absoluteProgress))
        }}
        renderItem={({ index }) => (
          <Card.Shadow flex={1} padding="0">
            <View flexDirection="column" flex={1} borderRadius="full">
              <Image
                source={require('../../assets/images/bg-rol-student.png')}
                resizeMode="cover"
                style={{
                  height: 80,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              />
              <View flex={1} px="1">
                <View height={10} />
                <Paragraph fontWeight="600" color="black">
                  Capacitación Docente USMP 2023 -II
                </Paragraph>
                <Paragraph fontSize={13} color="black">
                  Tipo de evento
                </Paragraph>
                <View height={10} />
                <View flexDirection="row">
                  <View width={2} />
                  <IconLocalization />
                  <View width={10} />
                  <Paragraph fontSize={10}>Salon de eventos USMP.</Paragraph>
                </View>
                <View height={10} />
                <View flexDirection="row">
                  <IconCalendar />
                  <View width={10} />
                  <Paragraph fontSize={10}>12 Oct 2023</Paragraph>
                </View>
              </View>
            </View>
          </Card.Shadow>
        )}
      />
      <CustomDots index={indexDot} length={6} />
    </View>
  )
}

export default CustomCarousel
