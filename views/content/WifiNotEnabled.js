import { StyleSheet } from 'react-native';


const WifiNotEnabled = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please enable WiFi</Text>
        </View>
    );
}
export default WifiNotEnabled;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    }, 
});