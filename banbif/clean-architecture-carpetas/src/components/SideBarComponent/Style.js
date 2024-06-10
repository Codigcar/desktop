import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    sideBar: {
        position: 'absolute',
        elevation: 2,
        backgroundColor: colors.white,
        top: 0,
        right: 70,
        left: 0,
        bottom: 0
    },
    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    blue: {
        color: colors.lightBlue
    },
    headerOuterContainer: {
    
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
});