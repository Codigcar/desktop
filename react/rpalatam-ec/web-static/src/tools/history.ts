import { IS_HIBRID } from './checkMobile'

/* export const historyBack = history => {
  // const UA = window.navigator.userAgent;
  let home = false;
  if (window.history.length === 1) home = true;
  // if (history.length === 2 && !/hybrid/.test(UA)) home = true;
  if (window.history.length === 2 && !IS_HIBRID()) home = true;
  if (/(ref=notification)|(ref=openapp)/gi.test(window.location.href)) {
    home = true;
  }
  if (home) {
    history.replace('/');
  } else {
    history.goBack();
  }
}; */

export function historyBack() {
  let home = false
  if (window.history.length === 1) home = true
  if (window.history.length === 2 && !IS_HIBRID()) home = true
  if (/(ref=notification)|(ref=openapp)/gi.test(window.location.href)) {
    home = true
  }
  if (home) {
    window.location.replace('/')
  } else {
    window.history.back()
  }
}
