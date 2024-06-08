import type { Action } from './actions'

type State = {
  saving: boolean
  topics: string[]
}

const initialState: State = {
  saving: false,
  topics: [],
}

export const topicsReducer = (state = initialState, props: Action): State => {
  switch (props.type) {
    case 'topics.SUBSCRIBE_TO_TOPIC':
      return {
        saving: true,
        topics: [...state.topics, props.payload.topic],
      }
    case 'topics.UNSUBSCRIBE_FROM_TOPIC':
      return {
        saving: true,
        topics: state.topics.filter(topic => topic !== props.payload.topic),
      }
    case 'topics.SET_TOPICS':
      return {
        saving: false,
        topics: props.payload.topics,
      }
    default:
      return state
  }
}
