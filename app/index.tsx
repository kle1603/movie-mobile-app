import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { GlobalContextType, useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext() as GlobalContextType;

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={images.logo as any}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.cards as any}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-4xl text-white font-bold text-center">
                            Discover Endless Possibilities with
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>

                        <Image
                            source={images.path as any}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-base font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meets innovation: embark on a journey
                        of limitless exploration with Aora
                    </Text>

                    <CustomButton
                        title="Continue with Email"
                        containerStyles="w-full mt-7"
                        handlePress={() => router.push("/sign-in")}
                    />
                </View>

                <StatusBar backgroundColor="#161622" style="light" />
            </ScrollView>
        </SafeAreaView>
    );
}
