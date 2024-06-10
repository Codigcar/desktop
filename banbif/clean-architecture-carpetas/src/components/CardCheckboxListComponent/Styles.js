import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
import { Platform } from "react-native";

export default StyleSheet.create({
  container: {
    borderWidth: 1,//Platform.OS === "ios" ? 1 : 0,
    borderRadius: 5,
    borderColor: "#ddd",
    // borderBottomWidth: 0,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    paddingTop: 5
  },
  iconBlue: {
    color: colors.lightBlue,
    paddingRight: 15
  },
  iconGrey: {
    color: colors.lightGrey,
    paddingRight: 15
  },
  containerTitle: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff",
    paddingBottom: 15,
    marginTop: Platform.OS === "ios" ? 0 : 5,
    marginLeft: Platform.OS === "ios" ? 0 : 5,
    marginRight: Platform.OS === "ios" ? 0 : 5
  },
  textTitle: {
    fontSize: 15,
    paddingLeft: 15,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  containerLine: {
    backgroundColor: "white",
    marginHorizontal: 2
  },
  line:{
    height: 1,
    backgroundColor: colors.grey,
    width: "90%",
    alignSelf: "center"
  },
  containerFlatlist: {
    marginTop: Platform.OS === "ios" ? 0 : 5,
    marginLeft: Platform.OS === "ios" ? 0 : 5,
    marginRight: Platform.OS === "ios" ? 0 : 5
  },
  flatlistContent:{},
  // Header
  headerContainer: {
    flex: 1
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: '10%'
  },
  headerDetailsContainer: {
    flexDirection: 'row',
    // backgroundColor: '#b44aab',
  },
  headerCurrency: {
    // justifyContent: 'center',
    width: '10%',
    paddintTop: '25%'
    // backgroundColor: '#321bc7',
  },
  headerDetails: {
    width: '75%',
    // backgroundColor: '#4ab463',
  },
  headerCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    // backgroundColor: '#a1b44a',
  },
  accountFont: {
    fontSize: 17,
    opacity: 0.6,
  },
});
