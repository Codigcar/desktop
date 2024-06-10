import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    centered: {
        alignItems: 'center',
    },
    right: {
        alignItems: 'flex-end',
        flex: 1
    },
    text: {
        color: colors.black,
        fontSize: 19
    },
    flex4: {
        flex: 4
    },
    blue: {
        color: colors.lightBlue
    }
});