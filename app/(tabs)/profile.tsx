import {
    FlatList,
    View,
    TouchableOpacity,
    Image,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/lib/useAppwrite";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";
import { useState } from "react";

const Profile = () => {
    const { user, setUser, setIsLoggedIn }: any = useGlobalContext();
    const { data: posts, refetch } = useAppwrite(() =>
        getUserPosts(user[0].$id)
    );
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();

        // re call the api -> if any videos appear
        setRefreshing(false);
    };

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace("/sign-in");
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts ?? []}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        username={item.creator.username}
                        avatar={item.creator.avatar}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        video={item.video}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            className="w-full items-end mb-10"
                            onPress={logout}
                        >
                            <Image
                                source={icons.logout as any}
                                resizeMode="contain"
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                            <Image
                                source={{ uri: user[0]?.avatar || "" }}
                                className="w-[90%] h-[90%] rounded-lg"
                                resizeMode="cover"
                            />
                        </View>

                        <InfoBox
                            title={user[0]?.username || ""}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />

                        <View className="mt-5 flex-row">
                            <InfoBox
                                title={posts.length.toString() || 0}
                                subtitle="Posts"
                                containerStyles="mr-10"
                                titleStyles="text-xl"
                            />
                            <InfoBox
                                title="1.2k"
                                subtitle="Followers"
                                titleStyles="text-xl"
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found"
                        subtitle="No videos found for the search query. Please try again."
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Profile;
