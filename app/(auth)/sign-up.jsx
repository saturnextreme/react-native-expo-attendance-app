import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../../components/formfield";
import Button from "./../../components/button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUpUser } from "../../lib/storeData";
import CryptoJS from "crypto-js";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (form.username != "" && form.email != "" && form.password != "") {
      try {
        const hashedPassword = CryptoJS.SHA256(form.password).toString();
        const updatedForm = { ...form, password: hashedPassword };
        setForm(updatedForm);

        const { message, data } = await signUpUser(form);
        if (message == 'Unsuccessful') {
          Alert.alert("Error", data);
        } else {
          try {
            const userId = data.id;
            await AsyncStorage.setItem("supabaseSession", userId);
            router.replace("/home");
          } catch (error) {
            Alert.alert("Error", error);
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      } 
    } else {
      Alert.alert(
        "Enter",
        "Fill all Credentials then try again"
      )
      setLoading(false)
    }
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView>
        <View className="flex-1 mx-5 my-[10%] items-center">
          <Text className="mt-10 text-orange-500 text-3xl font-bold">
            SignUp to StoreIT
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={"mt-10 py-4"}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"py-4"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"py-4"}
            secureTextEntry={true}
          />

          <Button
            title="Sign Up"
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

export default SignUp;
