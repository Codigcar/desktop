import KeyboardAvoidingView from './KeyboardAvoidingView'
import SafeAreaView from './SafeAreaView'
import ScrollView from './ScrollView'
import View from './View'

type BoxProps = {
  KeyboardAvoidingView: typeof KeyboardAvoidingView
  SafeAreaView: typeof SafeAreaView
  ScrollView: typeof ScrollView
  View: typeof View
}

const Box: BoxProps = () => null
Box.KeyboardAvoidingView = KeyboardAvoidingView
Box.SafeAreaView = SafeAreaView
Box.ScrollView = ScrollView
Box.View = View

export default Box
