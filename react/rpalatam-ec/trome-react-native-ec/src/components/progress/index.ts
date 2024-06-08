import Bar from './Bar'

type Subcomponents = {
  Bar: typeof Bar
}

const Progress: Subcomponents = () => null
Progress.Bar = Bar

export default Progress
