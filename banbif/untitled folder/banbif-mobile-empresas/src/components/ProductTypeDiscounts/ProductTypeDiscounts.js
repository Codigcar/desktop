import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "../Icon";
import styles from "../ProductTypeLeasing/Style";
import colors from "../../assets/colors";
import monetaryType from "../../monetaryType/monetaryType";
import { Monetary } from "../../utils/monetary";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";
import EntidadNombre from '../EntidadNombre'

export default class ProductTypeDiscounts extends Component {
    render() {
        return (
            <View {...this.props} style={styles.view}>
                <View style={{ flex: 1 }}>
                    <CurrencyComponent
                        moneda={this.props.moneda}
                    />

                </View>
                <View style={styles.headerOuterContainer}>
                    <View style={styles.titleContainer}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.titleFont}>Nro. de Descuento</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "50%" }}>
                            <Text style={styles.accountFont}>{this.props.number}</Text>
                        </View>
                    </View>

                    <View style={styles.titleContainer}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.titleFont}>Monto</Text>
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

ProductTypeDiscounts.proptype = {

};
