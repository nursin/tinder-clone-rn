import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
    {
        firstName: "Bobby",
        lastName: "Keel",
        occupation: "Software Developer",
        photoURL: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/259986923_2018974641595399_67999173903736900_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tp6y5RpPHKwAX-zzIrD&_nc_ht=scontent-atl3-2.xx&oh=00_AT8f3jtKNNhewzzYlmKF6MwFWuwea85zloO6md_I7gQwzA&oe=61FB3788",
        age: 34,
        id: 123
    },
    {
        firstName: "Elon",
        lastName: "Musk",
        occupation: "Software Developer",
        photoURL: "https://static01.nyt.com/images/2021/01/30/business/29musk-print/merlin_133348470_4909550a-2f4a-4c38-80b1-969f8306dfba-superJumbo.jpg?quality=75&auto=webp",
        age: 40,
        id: 456
    },
    {
        firstName: "Nikki",
        lastName: "Rubrico",
        occupation: "Registered Nurse",
        photoURL: "https://static01.nyt.com/images/2021/01/30/business/29musk-print/merlin_133348470_4909550a-2f4a-4c38-80b1-969f8306dfba-superJumbo.jpg?quality=75&auto=webp",
        age: 24,
        id: 789
    },
]

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const swipeRef = useRef(null);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView style={tw`flex-1`}>
            {/* Header */}
            <View style={tw`flex-row items-center justify-between px-5`}>
                <TouchableOpacity onPress={logout}>
                    <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                    <Image style={tw`h-14 w-14 rounded-full`} source={require("../assets/tinder_logo.png")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={30} color="#FF5850" />
                </TouchableOpacity>
            </View>
            {/* End of Header */}

            {/* Cards */}
            <View style={tw`flex-1 -mt-6`}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={() => {
                        console.log('Swipe PASS')
                    }}
                    onSwipedRight={() => {
                        console.log("Swipe MATCH")
                    }}
                    backgroundColor='#4FD0E9'
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    textAlign: "left",
                                    color: "green",
                                },
                            },
                        },
                    }}
                    renderCard={(card) => (
                        <View
                            key={card.id}
                            style={tw`relative bg-white h-3/4 rounded-xl`}
                        >
                            <Image
                                style={tw`absolute top-0 h-full w-full rounded-xl`}
                                source={{ uri: card.photoURL }}
                            />
                            <View style={[tw`absolute bottom-0 bg-white w-full h-20 px-6 py-2 flex-row justify-between items-center rounded-b-xl`, styles.cardShadow]}>
                                <View>
                                    <Text style={tw`text-xl font-bold`}>{card.firstName} {card.lastName}</Text>
                                    <Text>{card.occupation}</Text>
                                </View>
                                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={tw`flex flex-row justify-evenly`}>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200 mb-2`}
                >
                    <Entypo name="cross" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200 mb-2`}
                >
                    <AntDesign name="heart" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});