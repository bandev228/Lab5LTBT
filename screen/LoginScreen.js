import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const auth = getAuth(app);

const LoginScreen = () => {
    const navigation = useNavigation(); // Sử dụng useNavigation để điều hướng

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Đăng nhập thành công
                Alert.alert("Success", "Logged in successfully", [
                    { text: "OK", onPress: () => navigation.navigate('Home') } // Điều hướng đến HomeScreen
                ]);
            })
            .catch(error => {
                // Xử lý lỗi
                const errorMessage = error.message;
                Alert.alert("Login Failed", errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <EvilIcons name="user" size={100} color="black" style={styles.logo} />

            {/* Tiêu đề */}
            <Text style={styles.title}>Login to your Account</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
            />

            {/* Nút Sign In */}
            <TouchableOpacity style={styles.signInButton} onPress={loginUser}>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>

            {/* Đăng nhập bằng tài khoản mạng xã hội */}
            <Text style={styles.orText}>- Or sign in with -</Text>
            <View style={styles.socialLoginContainer}>
                <TouchableOpacity>
                    <AntDesign name="google" size={24} color="black" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="facebook-square" size={24} color="black" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="twitter" size={24} color="black" style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            {/* Liên kết đăng ký */}
            <View style={styles.signupContainer}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    signInButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#1e3d59',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    signInText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orText: {
        marginVertical: 10,
        color: '#888',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginBottom: 20,
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupText: {
        color: '#1e3d59',
        fontWeight: 'bold',
    },
});
