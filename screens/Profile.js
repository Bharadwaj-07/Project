import { StyleSheet, Text, View } from 'react-native';
import AdminMarks from './AdminMarks';

const Profile = () => {
    return (<View style={styles.container}>
        {/* <Text>Profile</Text> */}
        <AdminMarks></AdminMarks>
    </View>)
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});