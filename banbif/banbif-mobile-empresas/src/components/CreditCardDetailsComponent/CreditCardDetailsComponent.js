import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles";



export default class CreditCardDetailComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View style={{ paddingTop: 15 }}>
          <View style={styles.container}>
            <View style={styles.View}>
              <Text style={styles.textTitle}>{this.props.TextTitle}</Text>
            </View>
            <View
              style={styles.whiteList}>
              <View style={styles.list}>
                <Text>{this.props.TextAvailable}</Text>
              </View>
              <View style={styles.list}>
                <Text>{this.props.TextCredit}</Text>
              </View>
              <View style={styles.list}>
                <Text>{this.props.TextMantle}</Text>
              </View>
            </View>
            <View
              style={styles.greyList}
            >
              <View style={styles.list}>
                <Text>{this.props.ValueAvailable}</Text>
              </View>
              <View style={styles.list}>
                <Text>{this.props.ValueCredit}</Text>
              </View>
              <View style={styles.list}>
                <Text>{this.props.ValueMantle}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
CreditCardDetailComponent.proptype = {
  TextTitle: PropTypes.string,
  TextAvailable: PropTypes.string,
  TextCredit: PropTypes.string,
  TextMantle: PropTypes.string,
  ValueAvailable: PropTypes.string,
  ValueCredit: PropTypes.string,
  ValueMantle: PropTypes.string
};
