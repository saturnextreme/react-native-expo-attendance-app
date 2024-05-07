import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../../components/formfield";
import Button from "./../../components/button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyUser } from "../../lib/retrieveData";
import CryptoJS from "crypto-js";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (form.email != "" && form.password != "") {

      const hashedPassword = CryptoJS.SHA256(form.password).toString();
      const updatedForm = { ...form, password: hashedPassword };
      setForm(updatedForm);

      const { message, data } = await verifyUser(form);
      try {
        if (message == "Unsuccessfull") {
          Alert.alert("Invalid Credentials", data);
        } else {
          const userId = data.id;
          await AsyncStorage.setItem("supabaseSession", userId);
          router.replace("/home");
        }
      } catch {
        Alert.alert("Error", "Error while signing In");
      }
    } else {
      Alert.alert("Unfilled Form", "Fill each and every form field");
    }
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView>
        <View className="flex-1 mx-5 my-[10%] items-center">
          <Text className="mt-10 text-orange-500 text-3xl font-bold">
            SignIn to StoreIT
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-10 py-4"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"py-4"}
            secureTextEntry={true}
          />

          <Button
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="w-full mt-7 mx-10 bg-orange-500"
            textStyles="text-white"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="black" style="light" />
    </SafeAreaView>
  );
};

export default SignIn;
