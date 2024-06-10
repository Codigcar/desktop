import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: 17
    },
    icon: {
        color: colors.white
    },

    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    blue: {
        color: colors.lightBlue
    },
    headerOuterContainer: {
        marginLeft: 15
    },
    titleContainer: {
        marginBottom: 5
    },
    titleFont: {
        fontSize: 19,
        opacity: 0.87
    },
    accountFont: {
        fontSize: 19,
        opacity: 0.54
    },
    menuLine: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: colors.red
    },
    sideBar: {
        position: 'absolute',
        elevation: 2,
        backgroundColor: colors.white,
        top: 0,
        right: 70,
        left: 0,
        bottom: 0
    },
    back: {
        position: "absolute",
        backgroundColor: colors.red,
        right: 0,
        left: 300,
        top: 0,
        bottom: 0,
        elevation: 2,
    }


});
