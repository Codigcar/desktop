import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
    IconAndTextInputContainer: {
        flexDirection: "row", 
        padding: 10, 
        alignContent: "center",
        alignItems:"center",
        marginTop: 20
    },
    TextInputStyle: {
        height: 40,
        width: "70%", 
        borderWidth: 1,
        marginLeft: 10,
        borderLeftWidth: 6,
        textAlign: "left",
        paddingLeft: 20,
        color: colors.darkGrey,
        borderLeftColor: colors.lightBlue
    },
    text: {
        fontSize: 15,
        color: colors.darkGrey,
    },

    padding20: {
        paddingTop: 20,
        paddingLeft: 20
    },

    padding40: {
        paddingTop: 40
    },
    
    paddingTop20: {
        paddingTop: 20
    },
    

    container: {
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        marginTop: -130
    }
});
