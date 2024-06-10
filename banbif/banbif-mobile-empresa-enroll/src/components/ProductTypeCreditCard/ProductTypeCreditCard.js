import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "../Icon";
import styles from "../ProductTypeLeasing/Style";
import colors from "../../assets/colors";
import monetaryType from "../../monetaryType/monetaryType";
import { Monetary } from "../../utils/monetary";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";
import EntidadNombre from '../EntidadNombre'

export default class ProductTypeCreditCard extends Component {
    render() {
        return (
            <View {...this.props} style={styles.view}>
                <View style={{ flex: 1 }}>
                    <CurrencyComponent moneda={this.props.moneda} />
                </View>
                <View style={styles.headerOuterContainer}>
                    <View style={styles.titleContainer}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.titleFont}>Nro. De tarjeta</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "50%" }}>
                            <Text style={styles.accountFont}>
                                {this.props.nrProducto.length > 4
                                    ? "*".repeat(this.props.nrProducto.length - 4) +
                                    this.props.nrProducto.slice(
                                        this.props.nrProducto.length - 4,
                                        this.props.nrProducto.length
                                    )
                                    : this.props.NrAccount}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.titleFont}>Saldo de la Tarjeta</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "50%" }}>
                            <Text style={[styles.accountFont, { color: this.props.saldo > 0 ? colors.green : colors.red }]}>
                                {monetaryType[this.props.moneda] + Monetary.format(this.props.saldo)}</Text>
                        </View>
                    </View>
                    <EntidadNombre entidad={this.props?.entidad} isInList/>
                </View>


                <View style={styles.right} >
                    <Icon
                        style={{ color: this.props.color }}
                        family={Icon.ENTYPO}
                        name="chevron-small-right"
                        size={40}
                    />
                </View>
            </View>
        );
    }
}

ProductTypeCreditCard.proptype = {

};
