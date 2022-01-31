import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';

const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [occupation, setOccupation] = useState(null);
    const [age, setAge] = useState(null);
    const incompleteForm = !image || !occupation || !age;

    const updateUserProfile = () => {
        setDoc(doc(db, 'user', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL:image,
            occupation: occupation,
            age: age,
            timestamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate('Home')
        }).catch(error => {
            alert(error.message);
        });
    };

    return (
        <View style={tw`flex-1 items-center pt-1`}>
            <Image
                style={tw`h-20 w-full`}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/2pf" }}
            />
            <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Welcome {user.displayName}</Text>
            <Text style={tw`text-center p-4 font-bold text-red-400`}>
                Step 1: The Profile Pic
            </Text>
            <TextInput
                value={image}
                onChangeText={setImage}
                style={tw`text-center text-xl pb-2`}
                placeholder='Enter a Profile Pic URL'
            />
            <Text style={tw`text-center p-4 font-bold text-red-400`}>
                Step 2: The Job
            </Text>
            <TextInput
                value={occupation}
                onChangeText={setOccupation}
                style={tw`text-center text-xl pb-2`}
                placeholder='Enter you occupation'
            />
            <Text style={tw`text-center p-4 font-bold text-red-400`}>
                Step 3: The Age
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                style={tw`text-center text-xl pb-2`}
                placeholder='Enter your age'
                keyboardType='numeric'
                maxLength={2}
            />
            <TouchableOpacity
                disabled={incompleteForm}
                style={[tw`w-64 p-3 rounded-xl absolute bottom-10`, 
                incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`
            ]}
            onPress={updateUserProfile}
            >
                <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalScreen;
