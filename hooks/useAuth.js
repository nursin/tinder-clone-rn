import { View, Text } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Google from "expo-google-app-auth";
import { REACT_NATIVE_ANDROID_API_KEY, REACT_NATIVE_IOS_API_KEY } from '@env';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut
} from "@firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext({});

const config = {
    androidClientId: REACT_NATIVE_ANDROID_API_KEY,
    iosClientId: REACT_NATIVE_IOS_API_KEY,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // logged in ...
                    setUser(user);
                } else {
                    //not logged in ...
                    setUser(null);
                }

                setLoadingInitial(false);
            }),
        []
    );

    const logout = () => {
        setLoading(true);

        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === 'success') {
                //login ...
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                await signInWithCredential(auth, credential);
            }

            return Promise.reject();
        })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            signInWithGoogle,
            logout
        }}
        >
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
