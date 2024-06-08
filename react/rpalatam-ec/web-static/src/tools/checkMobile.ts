const newNavigator: any = window.navigator

export const UA = () => window.navigator.userAgent

export const IS_MOBILE = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(UA())

export const IS_IOS = () => {
  let check = false
  if (UA().match(/iPhone/i) || UA().match(/iPad/i) || UA().match(/iPod/i)) {
    check = true
  }
  return check
}

export const IS_HIBRID = () => /hybrid/.test(UA())

export const IS_IOS_SAFARI = () =>
  IS_IOS() && IS_HIBRID() === false && !newNavigator.standalone

export const IS_ANDROID = () =>
  UA()
    .toLowerCase()
    .indexOf('android') > -1
