import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  box: {
    borderColor: colors.extraLightGrey,
    borderWidth: 0,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal: 5
  },
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,


  },
  pageContainer: { width: 90, flexDirection: 'row', alignSelf: 'center', paddingTop: 10, alignContent: 'center', height: 100 },
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
    marginTop: -2
  },
  pageText: {
    marginLeft: 5,
    color: colors.lightBlue,
    marginTop: 7
  },
  View: {
    backgroundColor: colors.headerListGrey,
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    alignItems: "center"
  },
  Day: {
    color: colors.white,
    flex: 2
  },

  History: {
    color: colors.white,
    flex: 4
  },
  
  Value: {
    paddingLeft: 10,    
    color: colors.white,
    textAlign: 'center',
    flex: 2
  }
});
