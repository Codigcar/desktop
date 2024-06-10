import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    container: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0, height: 1
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: colors.white
    }
});
