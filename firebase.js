import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyB1lIq1Z3hKol_B2WUaSozaVngG85g7A0Q",
  authDomain: "usermanager-37a54.firebaseapp.com",
  projectId: "usermanager-37a54",
  storageBucket: "usermanager-37a54.appspot.com",
  messagingSenderId: "581921009678",
  appId: "1:581921009678:web:c89ea87e4c9984d088cc5f",
  measurementId: "G-6487X42ZRM",
  databaseURL: "https://usermanager-37a54-default-rtdb.firebaseio.com"
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };
    const putData = (key, data) => set(ref(database, key), data);

    return (
        <FirebaseContext.Provider value={{
            firebaseAuth,
            signupUserWithEmailAndPassword,
            putData
        }}>
            {props.children}
            </FirebaseContext.Provider>
    );
};
