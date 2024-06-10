import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Dimensions } from "react-native";
import colors from "../../assets/colors";
import PropTypes from "prop-types";
import styles from "./Styles";
import InterleavedListComponent from "../../components/InterleavedListComponent/InterleavedListComponent";
const height = Dimensions.get("window").height;

export default class DetailsComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View
          style={styles.viewContainer}
        >
          <View style={[styles.container]}>
            <ActivityIndicator
              style={{ paddingTop: this.props.size != 0 ? 40 : 0, }}
              animating={this.props.isvisible}

              size={this.props.size}
              color={colors.lightBlue}
            />

            {this.props.list &&
              <FlatList
                style={{ marginHorizontal: 2, maxHeight: height - 285 }}
                data={this.props.filteredProducts}
                renderItem={({ item }) => (
                  <InterleavedListComponent
                    BackgroundColor={
                      item.key % 2 == 0 ? colors.white : colors.listGrey
                    }
                    Text={item.text}
                    key={item.text}
                    Value={item.value}
                    key={item.value}
                  >
                    {item.textDetails}
                  </InterleavedListComponent>
                )}
              />
            }

          </View>
        </View>

      </View>
    );
  }
}
DetailsComponent.propstype = {
  filteredProducts: PropTypes.array
};
