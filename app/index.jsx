import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button';

import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  useEffect(() => {
    const checkSession = async () => {
      try {
        setTimeout(async () => {
        const sessionToken = await AsyncStorage.getItem('supabaseSession');
        if (sessionToken) {
          router.replace('/home');
        }
      }, 1000)
      } catch (error) {
        throw Error(error)
      }
    };

    checkSession();
  }, []);


  return (
    <SafeAreaView className='h-full'>
      <ImageBackground
          source={require('./../assets/black.jpg')}
          style={{ flex: 1 }}
          resizeMode='cover'
        >
        <ScrollView>
          <View className='flex-1 mt-[100px] items-center'>
            <Text className='text-7xl text-blue-400 font-extrabold'>Store IT</Text>
            <Text className='text-2xl text-white font-bold'>Attendance Management</Text>
          </View>
          <View className='flex-1 mt-[70%]'>
            <Button 
              title='Login'
              handlePress={()=> router.push("/sign-in")}
              containerStyles='w-auto mt-7 mx-10 bg-blue-950'
              textStyles='text-white'
            />
            <Button 
              title='Register Account'
              handlePress={()=> router.push("/sign-up")}
              containerStyles='w-auto mt-7 mx-10 bg-orange-700'
              textStyles='text-white'
            />
          </View>
        </ScrollView>
      </ImageBackground>

      <StatusBar backgroundColor="black" style="light" />
    </SafeAreaView>
  );
}
