import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import colors from "../../assets/colors";
import PropTypes from "prop-types";
import styles from "./Styles";
import CreditCardDetailComponent from "../CreditCardDetailsComponent/CreditCardDetailsComponent";

export default class CreditCardListComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View style={styles.distance}>
          <ActivityIndicator
            style={{ paddingTop: this.props.size != 0 ? 40 : 0, }}
            animating={this.props.isvisible}
            size={this.props.size}
            color={colors.lightBlue}
          />
          <View >
            {this.props.list &&
              <FlatList
                data={this.props.filteredProducts}
                renderItem={({ item }) => (
                  <CreditCardDetailComponent
                    key={item.TextTitle}
                    TextTitle={item.TextTitle}
                    TextAvailable={item.TextAvailable}
                    TextCredit={item.TextCredit}
                    TextMantle={item.TextMantle}
                    ValueAvailable={item.ValueAvailable}
                    ValueCredit={item.ValueCredit}
                    ValueMantle={item.ValueMantle}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 15 }}
              />
            }
          </View>
        </View>
      </View>
    );
  }
}
CreditCardListComponent.propstype = {
  filteredProducts: PropTypes.array
};
