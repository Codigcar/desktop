import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  searchBarContainer: {
    paddingLeft: 15
  },
  searchInput: {
    fontSize: 19,
    width: 200
  },
  searchIcon: {
    color: colors.darkGrey,
    marginRight: 40
  },
  loadingmessage: {
    fontSize: 15,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 5
  },
  searchInputContainer: {
    backgroundColor: colors.extraLightGrey,
    marginBottom: 5
  },
  containerButton: {
    flexDirection: "column",
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 2
  },
  textContainer: {
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightBlue,
    height: 35,
    width: 120
  },

  textContainerRechazar: {
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.customGrey,
    height: 35,
    width: 120
  },

  containerButtonAprobacion: {
    justifyContent: "center",
    marginTop: 5
  }

});
