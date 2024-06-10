
export const needsAppUpdate = (installedVersion, currentVersion) => {
  const [majorInstalledVersion, minorInstalledVersion, patchInstalledVersion] = installedVersion
  const [majorCurrentVersion, minorCurrentVersion, patchCurrentVersion] = currentVersion

  if (majorInstalledVersion < majorCurrentVersion) {
    return true
  }
  if (majorInstalledVersion === majorCurrentVersion && minorInstalledVersion < minorCurrentVersion) {
    return true
  }
  return majorInstalledVersion === majorCurrentVersion && minorInstalledVersion === minorCurrentVersion && patchInstalledVersion < patchCurrentVersion
}

/*export const isUpdate = (versionAppEmpresasAndroid, currentVersionAnd) => {
  if (versionAppEmpresasAndroid[0] <= currentVersionAnd[0]) {
    if (versionAppEmpresasAndroid[1] <= currentVersionAnd[1]) {
      if (versionAppEmpresasAndroid[2] <= currentVersionAnd[2]) {
      } else {
        return true
      }
    } else {
      return true
    }
  } else {
    return true
  }
  return false
}*/
