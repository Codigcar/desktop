import { IconCalendar, IconLocalization } from '../../assets/icons'
import View from '../box/View'
import Image from '../image'
import { Paragraph } from '../typhografic'
import CardShadow from './CardShadow'

type Props = {
  imageUrl: string
  children: JSX.Element
}

const CardImage: React.FC<Props> = ({ imageUrl, children }) => {
  return (
    <>
      <View width="100%" height={110}>
        <Image
          source={{
            uri: imageUrl,
          }}
          resizeMode="cover"
          style={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
        />
      </View>
      {children}
    </>
  )
}

export default CardImage
