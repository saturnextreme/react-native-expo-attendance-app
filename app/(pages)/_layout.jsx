import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const PageLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='attendance' options={{ headerShown: false }} />
        <Stack.Screen name='stats' options={{ headerShown: false }} />
    </Stack>
  )
}

export default PageLayout
