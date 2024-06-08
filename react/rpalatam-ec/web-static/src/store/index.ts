import { createStore, applyMiddleware, Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import reducer, { RootState } from './reducers'

export type ThunkResult<R, A extends Action> = ThunkAction<
  R,
  RootState,
  undefined,
  A
>

export default initialState =>
  createStore(reducer, initialState, applyMiddleware(thunk))
