import { StyleSheet } from "react-native";

export default StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: "#F5F5F5",
        width: '100%',
        alignItems: "center",
        borderBottomColor: "#ffffff",
        borderBottomWidth: 2,
        paddingLeft: 15,
        paddingRight: 15
    },
    parentHr: {
        height: 1,
        width: '100%',
    },
    child: {
        padding: 15
    },
    text: {
        alignContent: "center",
        alignSelf: "center",
        fontSize: 14,
        textAlign: 'justify',
    },
    blue: {
        width: '10%',
    }

});
