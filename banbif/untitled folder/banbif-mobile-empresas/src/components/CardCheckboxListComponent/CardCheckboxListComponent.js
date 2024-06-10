import React, { Component } from "react";
import { Text, View, FlatList, Platform, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import PropTypes, { instanceOf } from 'prop-types'
import Icon from "../Icon";
import Styles from "./Styles";
import HeaderGrupoEconomico from './HeaderGrupoEconomico'

export default class CardCheckboxListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      isOpened: false
    };
  }

  toggleCheck(isChecked) {
    return (
      <Icon
        size={25}
        name={isChecked ? 'ios-checkbox' : 'ios-square-outline'}
        family={Icon.IONICONS}
        style={isChecked ? Styles.iconBlue : Styles.iconGrey}
      />
    )
  }

  selectCard() {
    this.props.onChange(
      Object.assign({ ...this.props }, { isChecked: !this.state.isChecked })
    );
    this.setState({ isChecked: !this.state.isChecked });
  }

  openCard() {
    this.setState({isOpened: !this.state.isOpened})
  }

  render() {
    const { isChecked, isOpened } = this.state
    const { headerData, data, title, flagGrupo, hideHeaderLine } = this.props

    return (
      <View {...this.props}>
        { flagGrupo &&
          <HeaderGrupoEconomico
            hideLine={hideHeaderLine}
            headerData={headerData}
            isOpened={isOpened}
            title={title}
            onSelect={this.selectCard.bind(this)}
            checkBox={this.toggleCheck(isChecked)}
            onOpen={this.openCard.bind(this)}
          />
        }

        {
          (!flagGrupo || isOpened) &&
            <View style={Styles.container}>

              { !flagGrupo &&
                <TouchableOpacity onPress={() => this.selectCard()}>
                  <View style={Styles.containerTitle}>
                    <View style={{ width: "87%" }}>
                      <Text
                        style={Styles.textTitle}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                      >
                        {title}
                      </Text>
                    </View>
                    <View style={{ width: "13%" }}>
                      {this.toggleCheck(isChecked)}
                    </View>
                  </View>
                </TouchableOpacity>
              }

              <View style={Styles.containerLine}>
                <View style={Styles.line}/>
              </View>

              <View style={Styles.containerFlatlist}>
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: item.key % 2 == 0 ? colors.listGrey : colors.white,
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        height: 40
                      }}
                      key={item.value}
                    >
                      <Text style={{ flex: 3, paddingLeft: Platform.OS === "ios" ? 15 : 10 }}>
                        {item.text}
                      </Text>
                      <Text style={{ flex: 3, paddingRight: Platform.OS === "ios" ? 15 : 10 }}>
                        {item.value}
                      </Text>
                    </View>
                  )}
                />
              </View>

            </View>
        }
      </View>
    );
  }
}

CardCheckboxListComponent.propstype = {
  title: PropTypes.string,

  data: PropTypes.array
};
