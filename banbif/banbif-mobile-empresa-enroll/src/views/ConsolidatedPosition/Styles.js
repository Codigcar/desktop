import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create({
    separator: {
        borderWidth: 1,
        borderColor: colors.grey,
        marginBottom: 5,
        marginTop: 5
    },
    searchBarContainer: {
        paddingLeft: 15,

    },
    searchInput: {
        fontSize: 19,
        width: 200
    },
    searchIcon: {
        color: colors.darkGrey,
        marginRight: 40,
    },
    flex1: {
        flex: 1,
        backgroundColor: colors.white
    },
    searchInputContainer: {
        backgroundColor: colors.extraLightGrey,
        marginBottom: 15
    }
})
