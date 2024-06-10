import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import styles from './Styles'
import { StorageService } from '../../services/storage'

const EntidadNombre = ({ entidad, isInList }) => {
  const [flagGrupo, setFlagGrupo] = useState(false)
  const titleStyles = {
    ...(!isInList ? styles.titleContainerInner : {}),
    ...styles.titleContainer
  }

  const storeFlagGrupo = async () => {
    const flagGrupo = Boolean(await StorageService.getItemStorage('flagGrupo'))
    setFlagGrupo(flagGrupo)
  }

  useEffect(() => {
    storeFlagGrupo()
  }, [])

  if (!flagGrupo)
    return null

  return (
    Boolean(entidad) && (
      <View style={titleStyles}>
        <View style={{ justifyContent: "center", width: "50%" }}>
          <Text style={styles.titleFont}>{isInList ? "Entidad" : "ENTIDAD"}</Text>
        </View>
        <View style={{ justifyContent: "center", width: "50%" }}>
          <Text style={styles.accountFont}>{entidad}</Text>
        </View>
      </View>
    )
  )
}

export default EntidadNombre
