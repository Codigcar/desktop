import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import CurrencyComponent from '../CurrencyComponent'
import styles from './Styles'
import colors from '../../assets/colors'
import monetaryType from '../../monetaryType/monetaryType'
import { Monetary } from '../../utils/monetary'

const HeaderGrupoEconomico = ({ headerData: { moneda, monto, entidad = '' }, title, onSelect, checkBox, onOpen, hideLine, isOpened }) => (
  <TouchableOpacity onPress={onSelect}>
    <View style={{ ...styles.headerContainer, paddingTop: 15, borderTopColor: colors.lightGrey, borderTopWidth: hideLine ? 0 : 2 }}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerDetailsContainer}>
        <View style={styles.headerCurrency}>
          <CurrencyComponent moneda={moneda}/>
        </View>
        <View style={styles.headerDetails}>
          <Text style={[styles.accountFont, { color: monto > 0 ? colors.green : colors.red }]}>
            {monetaryType[moneda] + Monetary.format(monto)}
          </Text>
          <Text>{`Entidad: ${entidad.toUpperCase()}`}</Text>
          <TouchableOpacity onPress={onOpen} style={{paddingTop: 5, paddingBottom: 10}}>
            <Text style={{color: colors.lightBlue}}>{isOpened ? `Ocultar detalle` : `Ver detalle`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCheckbox}>
          {checkBox}
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

export default HeaderGrupoEconomico
