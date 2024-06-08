import { View } from '../box'
import { Paragraph } from '../typhografic'
import Image from './Image'

type Props = {
  title?: string
  body?: string
  footer?: string
  imageURL: string
  SuffixComponent?: React.ComponentType
  size?: number
}

const AvatarImage: React.FC<Props> = ({
  title,
  body,
  footer,
  imageURL,
  SuffixComponent,
  size = 48
}) => {
  return (
    <View flexDirection="row" alignItems="center">
      <View
        height={size}
        width={size}
        bg="primary"
        borderRadius="full"
        borderWidth={1.5}
        borderColor="primary"
        mt="0.25"
        mr="0.5">
        <Image
          source={{
            uri: imageURL,
          }}
          resizeMode="cover"
          style={{ borderRadius: 99 }}
        />
      </View>
      <View flex={1}>
        {title ? (
          <Paragraph color="black" fontWeight="600">
            {title}
          </Paragraph>
        ) : null}
        {body ? <Paragraph>{body}</Paragraph> : null}
        {footer ? <Paragraph fontSize={10}>{footer}</Paragraph> : null}
      </View>
      <View>{SuffixComponent ? <SuffixComponent /> : null}</View>
    </View>
  )
}
export default AvatarImage
