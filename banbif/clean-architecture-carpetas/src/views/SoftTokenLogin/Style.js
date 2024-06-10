import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
    viewContainer: {
        alignContent: "center",
        //justifyContent: "center",
        //alignSelf: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white
    },

    view: {
        color: colors.lightBlue,
        alignContent: "center",
        alignSelf: "center",
        fontSize: 16
    },

    text1: {
        color: colors.lightBlue,
        alignContent: "center",
        alignSelf: "center",
        fontSize: 26,
        paddingTop: 5,
        letterSpacing: 10
    },

    text2: {
        fontSize: 15,
        alignContent: "center",
        alignSelf: "center",
        paddingTop: 26
    },

    text3: {
        fontSize: 15,
        alignContent: "center", 
        alignSelf: "center"
    },

    contentContainer: {
        alignItems: "center",
        paddingTop: 4
    },

    claveUsoPersonal: {
        paddingTop: 30,
        alignItems: "center"
    },

    token: {
        alignItems: "center",
        paddingTop: 60
    },
    tituloRecuerda: {
        color: colors.lightBlue,
        fontSize: 16,
        fontWeight: "bold"
    },
    textoRecuerda: {
        color: colors.lightBlue,
        fontSize: 16
    },

    contenedorRecuerda: {
        marginTop: 50,
        backgroundColor: colors.lightLightGrey,
        padding: 10
    },
});


