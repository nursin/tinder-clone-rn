import { View, Text, Button } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();
    console.log(signInWithGoogle)
    return (
        <View>
            <Text style={tw`text-center pt-3`}>Login to the app</Text>
            <Button 
            style={tw`bg-black`} 
            title='login' 
            onPress={signInWithGoogle}
            />
        </View>
    );
};

export default LoginScreen;
