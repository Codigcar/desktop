import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "../Icon";
import styles from "../ProductTypeLeasing/Style";
import colors from "../../assets/colors";
import monetaryType from "../../monetaryType/monetaryType";
import { Monetary } from "../../utils/monetary";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";
import EntidadNombre from '../EntidadNombre'

/* Item de la lista de depositos a plazo fijo */
export default class ProductTypeTimeDeposits extends Component {
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
                            <Text style={styles.titleFont}>Nro. De Cuenta</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "50%" }}>
                            <Text style={styles.accountFont}>{this.props.nrProducto}</Text>
                        </View>

                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.titleFont}>Saldo Disponible</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "50%" }}>
                            <Text style={[styles.accountFont, { color: colors.green }]}>
                                {monetaryType[this.props.moneda] + Monetary.format(this.props.saldoDisponible)}</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.titleFont}>Saldo con el interés ganado</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "50%" }}>
                            <Text style={[styles.accountFont, { color: colors.darkBlue }]}>
                                {monetaryType[this.props.moneda] + Monetary.format(this.props.saldoInteres)}</Text>
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

ProductTypeTimeDeposits.proptype = {

};
