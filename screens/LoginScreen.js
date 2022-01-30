import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false,
    //     })
    // }, []);

    return (
        <View style={tw`flex-1`}>
            <ImageBackground
                resizeMode="cover"
                style={tw`flex-1`}
                source={{ uri: "https://tinder.com/static/tinder.png" }}
            >
                <TouchableOpacity
                    style={[tw`absolute bottom-20 w-52 bg-white p-4 rounded-2xl`,
                    { marginHorizontal: "25%" }
                    ]}
                    onPress={signInWithGoogle}
                >
                    <Text style={tw`font-semibold text-center`}>{loading ? "Loading ..." : "Login"}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen;
