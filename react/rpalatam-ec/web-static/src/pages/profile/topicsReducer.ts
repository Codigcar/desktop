const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TOPICS':
    case 'ADD_TOPICS':
    case 'RESTORE_TOPICS': {
      return {
        ...state,
        topics: action.payload,
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case 'TOPICS_SAVING': {
      return {
        ...state,
        saving: action.payload,
      }
    }
    case 'SET_CHANGED': {
      return {
        ...state,
        isChanged: action.payload,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    case 'SET_DIDMOUNT': {
      return {
        ...state,
        didMount: action.payload,
      }
    }
    default:
      return state
  }
}

export default reducer
