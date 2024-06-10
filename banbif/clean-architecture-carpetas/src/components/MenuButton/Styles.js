import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    shadowContainer: {
        margin: 7,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.lightLightGrey
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: (Dimensions.get('window').width/2) - 31,
        height: 150
    },
    blue: { color: colors.lightBlue},
    text: {
        fontSize: Dimensions.get('window').width > 350 ? 15 : 12,
        textAlign: 'center'
    }
});
