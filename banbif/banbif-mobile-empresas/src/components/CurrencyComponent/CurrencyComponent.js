import React, { Component } from "react";
import { View, Text } from "react-native";
import colors from "../../assets/colors";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon"

export default class CurrencyComponent extends Component {
    render() {
        return (
            <View {...this.props}>
                {this.props.moneda == "USD" &&
                    <Icon
                        size={25}
                        name="dollar"
                        family={Icon.FONT_AWESOME}
                        style={{ color: colors.lightBlue }}
                    />}
                {this.props.moneda == "EUR" &&
                    < Icon
                        size={25}
                        name="euro"
                        family={Icon.FONT_AWESOME}
                        style={{ color: colors.lightBlue }}
                    />
                }
                {this.props.moneda == "SOL" &&
                    <Text style={{ fontSize: 25, color: colors.lightBlue, fontWeight: "bold" }}>S/.</Text>
                }
            </View>
        );
    }
}
CurrencyComponent.propstype = {
    moneda: PropTypes.string
};
