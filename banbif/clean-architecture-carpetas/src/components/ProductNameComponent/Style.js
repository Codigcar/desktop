import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    headerContainer: {
        paddingRight: 15,
        paddingBottom:5,
        paddingTop: 5,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    blue: {
        color: colors.lightBlue
    },
    headerOuterContainer: {
        marginLeft: 15,
        flex: 5
    },
    titleContainer: {
        marginBottom: 5
    },
    titleFont: {
        fontSize: 17,
        opacity: 1
    },
    accountFont: {
        fontSize: 17,
        opacity: 0.6
    },

    menuLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    right: {
        alignItems: 'flex-end',
        flex: 1


    },
});
