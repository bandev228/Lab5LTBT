import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";
import { app } from './firebase';  // Đảm bảo rằng bạn đã nhập app đúng cách
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './screen/SignupScreen';
import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';

const db = getDatabase(app);
const auth = getAuth(app);
const Stack = createStackNavigator();

// const putData = () => {
//   set(ref(db, 'users/1'), {
//     username: '"Tan Ban',
//     email: 'johndoe@gmail.com',
//     age: 30,
//   })
//     .then(() => {
//       Alert.alert("Success", "Data saved successfully!");
//     })
//     .catch((error) => {
//       Alert.alert("Error", error.message);
//     });
// }
// const signupUser = () => {
//   createUserWithEmailAndPassword(
//     auth,
//     'test@gmail.com',
//     '123456'
//   ).then ((value)  => console.log(value));
// };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

// <Button title="Put Data" onPress={putData} />
//       <Button title="Sign Up" onPress={signupUser} />