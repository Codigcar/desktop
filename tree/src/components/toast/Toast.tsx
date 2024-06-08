import { BaseToastProps } from 'react-native-toast-message'

import View from '../box/View'
import Paragraph from '../typhografic/Paragraph'
import {
  IconToastClose,
  IconToastError,
  IconToastSuccess,
  IconToastWarning,
} from '../../assets/icons'

const ToastCustom: React.FC<{
  iconSVG: JSX.Element
  title: string
  description: string
  type: 'Success' | 'Warning' | 'Error'
}> = ({ type, iconSVG, title, description }) => {
  return (
    <View
      borderColor={`toast${type}`}
      borderWidth={1}
      flex={1}
      height={66}
      width="90%"
      borderRadius="md"
      flexDirection="row"
      bg="white">
      <View flex={1} flexDirection="row" pt="0.5">
        <View pl="0.5" pr="0.5">
          {iconSVG}
        </View>
        <View>
          <Paragraph fontWeight="bold">{title}</Paragraph>
          <Paragraph>{description}</Paragraph>
        </View>
      </View>
      <View padding="0.75">
        <IconToastClose />
      </View>
    </View>
  )
}

const toastConfig = {
  success: (props: BaseToastProps) => (
    <ToastCustom
      type="Success"
      title={props.text1!}
      description={props.text2!}
      iconSVG={<IconToastSuccess />}
    />
  ),
  error: (props: BaseToastProps = {}) => (
    <ToastCustom
      type="Error"
      title={props.text1 ?? 'Hubo un error'}
      description={props.text2 ?? 'Contáctese con soporte por favor.'}
      iconSVG={<IconToastError />}
    />
  ),
  info: (props: BaseToastProps) => (
    <ToastCustom
      type="Warning"
      title={props.text1!}
      description={props.text2!}
      iconSVG={<IconToastWarning />}
    />
  ),
}

export default toastConfig
