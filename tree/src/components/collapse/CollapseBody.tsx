import { View } from '../box'
import { Paragraph } from '../typhografic'

type Props = {
  children: React.ReactElement
}
const CollapseBody: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default CollapseBody
