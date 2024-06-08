export type Action =
  | { type: 'topics.SET_TOPICS'; payload: { topics: string[] } }
  | { type: 'topics.SUBSCRIBE_TO_TOPIC'; payload: { topic: string } }
  | { type: 'topics.UNSUBSCRIBE_FROM_TOPIC'; payload: { topic: string } }

export const setTopics = (topics: string[]): Action => {
  return {
    type: 'topics.SET_TOPICS',
    payload: { topics },
  }
}

export const subscribeToTopic = (topic: string): Action => {
  return {
    type: 'topics.SUBSCRIBE_TO_TOPIC',
    payload: { topic },
  }
}

export const unsubscribeFromTopic = (topic: string): Action => {
  return {
    type: 'topics.UNSUBSCRIBE_FROM_TOPIC',
    payload: { topic },
  }
}
