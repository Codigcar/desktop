import React, { useEffect, useState } from 'react'

type State = {
  status: string
  response?: any
  error?: Error
}

type Action =
  | { type: 'idle' }
  | { type: 'started' }
  | { type: 'success'; response: any }
  | { type: 'error'; error: any }

function fetchReducer(state: State, action: Action) {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      }
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        response: action.response,
      }
    }
    case 'started': {
      return {
        ...state,
        status: 'pending',
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useFetch(url: string, apiOptions?) {
  const [state, dispatch] = React.useReducer(fetchReducer, {
    status: 'idle',
    response: null,
    error: null,
  })
  const [options] = useState(apiOptions)

  useEffect(() => {
    const request = window.Request ? new Request(url, options) : url
    const controller = window.AbortController && new AbortController()
    async function fetchData() {
      dispatch({ type: 'started' })
      try {
        const res = await fetch(request, {
          ...(options || {}),
          signal: controller?.signal,
        })
        const response = await res.json()
        dispatch({ type: 'success', response })
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'error', error })
        }
      }
    }
    fetchData()
    return () => {
      controller?.abort()
    }
  }, [url, options])

  return {
    isLoading: state.status === 'idle' || state.status === 'pending',
    isIdle: state.status === 'idle',
    isPending: state.status === 'pending',
    isResolved: state.status === 'resolved',
    isRejected: state.status === 'rejected',
    ...state,
  }
}

export default useFetch
