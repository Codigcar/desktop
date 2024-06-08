import CollapseHeader from './CollapseHeader'
import CollapseBody from './CollapseBody'
import CollapseContainer from './Collapse'

type CardProps = {
  Header: typeof CollapseHeader
  Body: typeof CollapseBody
  Container: typeof CollapseContainer
}

const Collapse: CardProps = () => null

Collapse.Header = CollapseHeader
Collapse.Body = CollapseBody
Collapse.Container = CollapseContainer

export default Collapse
