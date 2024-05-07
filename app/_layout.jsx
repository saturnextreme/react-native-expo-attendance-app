import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { createContext } from 'react';

export const DataContext = createContext();

const RootLayout = () => {
  const [data, setData] = useState()
  return (
    <DataContext.Provider value={{data, setData}} >
    <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
    </Stack>
    </DataContext.Provider>
  )
}

export default RootLayout
