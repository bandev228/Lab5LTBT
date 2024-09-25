import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native'; 
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { app } from '../firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app); // Lấy database từ Firebase

const SignupScreen = () => {
    const navigation = useNavigation(); // Sử dụng hook useNavigation

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const validateInputs = () => {
        if (!email) {
            setError("Email is required");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return false;
        }
        if (password.length < 6) {
            setError("Password should be at least 6 characters long");
            return false;
        }
        return true;
    };

    const createUser = () => {
        setError("");
        if (validateInputs()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // Đăng ký thành công
                    const user = userCredential.user;

                    // Lưu thông tin người dùng vào Firebase Realtime Database
                    const userRef = ref(database, `users/${user.uid}`);
                    set(userRef, {
                        email: user.email,
                        uid: user.uid,
                        createdAt: new Date().toISOString(),
                    })
                    .then(() => {
                        Alert.alert(
                            "Thành công",
                            "Tài khoản của bạn đã đăng ký thành công và được lưu vào hệ thống",
                            [
                                {
                                    text: "OK", onPress: () => {
                                        navigation.navigate('Login'); // Chuyển sang trang LoginScreen
                                    }
                                }
                            ]
                        );
                    })
                    .catch(error => {
                        // Xử lý lỗi khi lưu vào database
                        Alert.alert("Error", "Failed to save data to the database");
                    });
                })
                .catch(error => {
                    const errorMessage = error.message;
                    setError(errorMessage);
                });
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(userCredential => {
                // Đăng nhập thành công
                const user = userCredential.user;
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
            <Text style={styles.title}>Create an Account</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email here"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password here"
                secureTextEntry={true}
                autoCapitalize="none"
            />

            {/* Confirm Password Input */}
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Enter your password again"
                secureTextEntry={true}
                autoCapitalize="none"
            />

            {/* Nút Sign Up */}
            <TouchableOpacity style={styles.signInButton} onPress={createUser}>
                <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Đăng ký bằng tài khoản mạng xã hội */}
            <Text style={styles.orText}>- Or sign up with -</Text>
            <View style={styles.socialLoginContainer}>
                <TouchableOpacity onPress={signInWithGoogle}>
                    <AntDesign name="google" size={24} color="black" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="facebook-square" size={24} color="black" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="twitter" size={24} color="black" style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            {/* Điều hướng đến trang Login */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;

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
    loginLink: {
        color: '#1e3d59',
        fontWeight: 'bold',
        marginTop: 15,
    },
});
