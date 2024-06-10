import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    alignContent: "space-between",
    justifyContent: "space-between",
    height: 35,
  },
  titleContainerInner: {
    paddingLeft: 25,
    paddingRight: 20,
    backgroundColor: colors.lightGrey
  },
  titleFont: {
    fontSize: 17,
    opacity: 1,
  },
  accountFont: {
    fontSize: 17,
    opacity: 0.6,
    flexWrap: "wrap",
    alignSelf: "flex-end",
  },


  entidadText: {
    fontSize: 17,
    opacity: 1,
    color: colors.lightBlue,
  },
  entidad: {
    paddingLeft: 17,
    paddingBottom: 5
  }
})
