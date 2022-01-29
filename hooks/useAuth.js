import { View, Text } from 'react-native';
import React, { createContext, useContext } from 'react';
import * as Google from "expo-google-app-auth";
import { REACT_NATIVE_ANDROID_API_KEY, REACT_NATIVE_IOS_API_KEY } from '@env';


const AuthContext = createContext({});

const config = {
    androidClientId: REACT_NATIVE_ANDROID_API_KEY,
    iosClientId: REACT_NATIVE_IOS_API_KEY,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

    const signInWithGoogle = async () => {
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === 'success') {
                //login ...
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            user: null,
            signInWithGoogle
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
