import { View, StyleSheet } from 'react-native';
import Guardian from '../components/Guardian';

export default function SettingsScreen() {
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.body}> 
                <Guardian></Guardian>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    header: {
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    body: {
        flex: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
  });