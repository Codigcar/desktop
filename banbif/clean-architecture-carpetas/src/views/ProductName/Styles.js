import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import {Platform} from "react-native"

export default StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1
    },
    separator: {
        borderWidth: 1,
        borderColor: colors.grey,
        marginBottom: 5,
        marginTop: 5
    },
    pageContainer: { width: 90, flexDirection: 'row', alignSelf: 'center', marginTop: 10, alignContent: 'center', height: 100 },
    pageIcon: {
      backgroundColor: colors.white,
      borderColor: colors.lightBlue,
      borderWidth: 1,
      borderRadius: 10,
      width: 20,
      height: 20,
      shadowOpacity: 0,
      shadowColor: colors.white,
      shadowRadius: 0,
      marginTop: 5
    },
    pageIconText: {
      color: colors.lightBlue,
      paddingLeft: 2,
      marginTop: Platform.OS === 'ios'? -2: -5
    },
    pageText: {
      marginLeft: 5,
      color: colors.lightBlue,
      marginTop: 7
    },
    textNotFound:{
      flex: 1,
      alignItems: "center",
      alignSelf: "center",
      paddingTop: 15
    }

});
