import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import { Dimensions } from 'react-native';
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    LoginContainer: {
        height: "100%",
        backgroundColor: colors.white
    },
    LogoContainer: {
        alignItems: "center",
        paddingTop: 30,
    },
    ContentContainer: {
        alignItems: "center",
        paddingTop: 30,
    },

    IconAndTextInputContainer: {
        flexDirection: "row",
        padding: 10,
        alignContent: "center",
        alignItems: "center"
    },
    TextInputStyle: {
        height: 40,
        width: "70%",
        borderWidth: 1,
        marginLeft: 20,
        borderLeftWidth: 6,
        textAlign: "left",
        paddingLeft: 20,
        color: colors.darkGrey,
    },
    ForgotPassword: {
        flexDirection: 'row',
        alignItems: "center",
        width: "90%",
        paddingRight: 30
    },

    PaddingTopView: {
        paddingTop: 15
    },
    TextCheckBoxStyle: {
        color: "gray",
        fontWeight: "normal"
    },

    ContainerSofttoken: {
        alignContent: "center",
        backgroundColor: colors.lightBlue,
        alignItems: "center",
        width: 150,
    },

    ContainerSofttokenDisabled: {
        alignContent: "center",
        backgroundColor: colors.customGrey,
        alignItems: "center",
        width: 150,
    },

    ViewSofttoken: {
        alignItems: "center",
        justifyContent: 'center',
        width: 160,
        height: 40,
        flexDirection: "row",

    },

    TextSofttoken: {
        color: colors.white,
        paddingLeft: 10,
        fontSize: 14
    }

})
