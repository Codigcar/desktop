import { ActivityIndicator, Modal } from 'react-native'
import View from '../box/View'

const Loading: React.FC = () => {
  return (
    <Modal transparent visible>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
        <ActivityIndicator color="#BD1714" size="large" />
      </View>
    </Modal>
  )
}
export default Loading
