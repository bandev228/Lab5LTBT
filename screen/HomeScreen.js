import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation(); // Sử dụng useNavigation để điều hướng
    const auth = getAuth(); // Lấy thông tin xác thực Firebase

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Đăng xuất thành công
                Alert.alert("Logged out", "You have been logged out", [
                    { text: "OK", onPress: () => navigation.navigate('Login') } // Điều hướng đến LoginScreen
                ]);
            })
            .catch((error) => {
                // Xử lý lỗi khi đăng xuất
                Alert.alert("Logout failed", error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home Screen</Text>

            {/* Nút Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
