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
import InterleavedListMovementCreditCardComponent from "../InterleavedListMovementCreditCardComponent/InterleavedListMovementCreditCardComponent.js";
const height = Dimensions.get("window").height;
import { Monetary } from "../../utils/monetary";

export default class AccountMovementCreditCardComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View style={styles.View}>
          <Text style={styles.Day}>Fecha Cons.</Text>
          <Text style={styles.Day}>Fecha Proc.</Text>
          <Text style={styles.History}>Descripción   </Text>
          <Text style={styles.Value}>Monto S/.</Text>
          <Text style={styles.Value}>Monto $</Text>
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
                  <InterleavedListMovementCreditCardComponent
                    key={item.textDetails}
                    BackgroundColor={
                      !(index % 2 == 0) ? colors.listGrey : colors.white
                    }
                    FechaConsumo={
                      !(item.fechaConsumo == undefined)
                        ? DateFormat.formatMonthNameMovement(item.fechaConsumo)
                        : ""
                    }
                    FechaProceso={
                      !(item.fechaProceso == undefined)
                        ? DateFormat.formatMonthNameMovement(item.fechaProceso)
                        : ""
                    }
                    History={item.descripcion}
                    Soles={Monetary.format(item.montoSoles)}
                    Dolares={Monetary.format(item.montoDolares)}
                    onPress={() =>
                      this.props.navigation.navigate("Product Name")
                    }
                  >
                    {item.textDetails}
                  </InterleavedListMovementCreditCardComponent>
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
        <View style={{ backgroundColor: colors.white, height: 100, marginBottom: 20 }}>
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
AccountMovementCreditCardComponent.propstype = {
  filteredProducts: PropTypes.array,
  Currency: PropTypes.string
};
