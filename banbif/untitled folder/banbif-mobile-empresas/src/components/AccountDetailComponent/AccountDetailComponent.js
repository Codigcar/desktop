import React, { Component } from "react";
import {  View } from 'react-native'
import BlueLineWithTextComponent from "../../components/BlueLineWithTextComponent/BlueLineWithTextComponent";
import DollarIconAndTextComponent from "../../components/DollarIconAndTextComponent/DollarIconAndTextComponent";
import colors from "../../assets/colors";
import PropTypes from "prop-types";
import EntidadNombre from '../EntidadNombre'

/* Detalle de una cuenta de cuenta corriente y de ahorro*/
export default class AccountDetailComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View >
          <DollarIconAndTextComponent
            NrAccount={this.props.NrAccount}
            NrCCI={this.props.NrCCI}
            ArrowColor={colors.white}
            isDetail={true}
            moneda={this.props.moneda}
          />
        </View>
        <EntidadNombre entidad={this.props?.entidad}/>
        <View>
          <BlueLineWithTextComponent Text={this.props.type} />
        </View>
      </View>
    );
  }
}
AccountDetailComponent.propstype = {
  NrAccount: PropTypes.string,
  NrCCI: PropTypes.string
}
