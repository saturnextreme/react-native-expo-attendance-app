import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "./_layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfileData } from "../../lib/retrieveData";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
  const { session, setSession } = useContext(MyContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await useProfileData(session);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-start items-center h-full w-full bg-gray-950">
      <View className="py-10 w-full h-auto items-center rounded-b-[30px] bg-gray-900 border-[1px] border-t-[0] border-gray-800">
        <Icon name={"user-circle-o"} size={100} color={"#fff"} />
        <View className="items-center py-4">
          <Text className="text-lg text-white px-2">{user.username}</Text>
          <Text className="text-lg text-white px-2">{user.email}</Text>
        </View>
        <Button
          title="Log Out"
          containerStyles="w-[120px] h-[40px] bg-red-500"
          handlePress={async () => {
            await AsyncStorage.removeItem("supabaseSession");
            router.replace("/");
          }}
          textStyles="text-white"
        />
      </View>
      <View className="justify-center items-start px-6 py-4 bg-gray-800 rounded-[10px] m-4 w-full">
        <Text className="text-xl font-medium text-orange-500 text-center w-full pb-2">
          How to use
          </Text>
        <Text className="text-md font-medium text-white my-2 py-1 px-2  rounded-[10px] w-full">
          1. Add courses and subject in with the add screen.
        </Text>
        <Text className="text-md font-medium text-white my-2 py-1 px-2  rounded-[10px] w-full">
          2. Add attendance of absent and present by accessing subjects of
          course.
        </Text>
        <Text className="text-md font-medium text-white my-2 py-1 px-2  rounded-[10px] w-full">
          3. Hold a course to Edit or Delete the course.
        </Text>
        <Text className="text-md font-medium text-white my-2 py-1 px-2  rounded-[10px] w-full">
          4. View Graphical Representation of you attendance in Stats.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
