import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
// import * as serviceWorker from './serviceWorker';
import createStore from './store'
import { initializeConfig } from './store/config/actions'
import { ModalRef } from './tools/postMessages'
// import Notification from './system/notification/index.tsx';

declare global {
  interface Window {
    NATIVE_CONNECTION: any
    PACKAGE: {
      version: number
    }
    REDUX_DATA: any
    STORY_DATA: any
    dataLayer: any
    ga: any
    payU: any
    currentModal: ModalRef
    appHistory: any
  }
}

const store = createStore(window.REDUX_DATA)
store.dispatch(initializeConfig(window.location.hostname))

const jsx = (
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
)

Loadable.preloadReady().then(() => {
  const root = document.getElementById('root')
  ReactDOM.render(jsx, root)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
