import { StyleSheet } from 'react-native';
import color from '../../assets/colors';

export default StyleSheet.create({
    container: {
        width: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: color.white,
        fontSize: 17
    },
    icon: {
        color: color.white
    }
});