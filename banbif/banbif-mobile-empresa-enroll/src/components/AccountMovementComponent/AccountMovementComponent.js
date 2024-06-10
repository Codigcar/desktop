import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from "react-native";
import colors from "../../assets/colors";
import PropTypes from "prop-types";
import { DateFormat } from "../../utils/dateFormat"
import styles from "./Styles";
import InterleavedListMovementComponent from "../InterleavedListMovementComponent/InterleavedListMovementComponent.js";
const height = Dimensions.get("window").height;
import monetaryType from "../../monetaryType/monetaryType";
import { Monetary } from "../../utils/monetary";

export default class AccountMovementComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View style={styles.View}>
          <Text style={styles.Day}>Fecha</Text>
          <Text style={styles.History}>Descripción</Text>
          <Text style={styles.Value}>
            Monto {monetaryType[this.props.Currency]}
          </Text>
        </View>
        <View>
          <View style={[styles.container, { height: height - 270 }]}>
            <ActivityIndicator
              style={{ paddingTop: this.props.size != 0 ? 40 : 0 }}
              animating={this.props.isvisible}
              size={this.props.size}
              color={colors.lightBlue}
            />

            {this.props.list && (
              <FlatList
                data={this.props.filteredProducts}
                renderItem={({ item, index }) => (
                  <InterleavedListMovementComponent
                    key={item}
                    BackgroundColor={
                      !(index % 2 == 0) ? colors.listGrey : colors.white
                    }
                    Day={
                      !(item.fechaMovimiento == undefined)
                        ? DateFormat.formatMonthName(item.fechaMovimiento)
                        : ""
                    }
                    History={item.descripcion}
                    Doa={item.numeroOperacion}
                    Value={
                      (item.esDebito) ? Monetary.format(-item.montoMovimiento) : Monetary.format(item.montoMovimiento)
                    }
                    onPress={() =>
                      this.props.navigation.navigate("Product Name")
                    }
                  >
                    {item.textDetails}
                  </InterleavedListMovementComponent>
                )}
                ListFooterComponent={this.ConditionalFooter}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  ConditionalFooter = () => {
    if (this.props.nextPage > 1) {
      return (
        <View style={{ backgroundColor: colors.white, height: 110, marginBottom: 20 }}>
          <TouchableOpacity onPress={this.props.onNextPage}>
            <View style={styles.pageContainer}>
              <View style={styles.pageIcon}>
                <Text style={styles.pageIconText}>...</Text>
              </View>
              <Text style={styles.pageText}>Ver más</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View style={{ height: 100 }}></View>;
    }
  };
}
AccountMovementComponent.propstype = {
  filteredProducts: PropTypes.array,
  Currency: PropTypes.string
};
