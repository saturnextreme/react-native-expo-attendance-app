import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyContext = createContext();

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Icon name={icon} size={30} color={color} />
      <Text
        className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    const getSession = async () => {
        let _session = await AsyncStorage.getItem("supabaseSession");
        setSession(_session);
    };
    getSession();
  }, []);

  if (session === null ) {
    return (
        <View className='flex-1 justify-center items-center'>
            <Text>Loading...</Text>
        </View>
    )
  } else {

  return (
    <MyContext.Provider value={{ session, setSession }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"home"}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"plus"}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"bar-chart"}
                color={color}
                name="Stats"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"user"}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="black" style="light" />
    </MyContext.Provider>
  );
}
};

export default TabsLayout;
