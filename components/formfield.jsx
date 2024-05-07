import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({
    title, 
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    secureTextEntry,
    ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className='text-base text-gray-100 font-medium'>{title}</Text>
        <View className='w-full h-16 px-4 bg-gray-900 rounded-2xl border-black-200 flex flex-row items-center'>
            <TextInput 
                className='flex-1 text-white font-semibold text-base'
                value={value}
                placeholder={placeholder}
                onChangeText={handleChangeText}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                {...props}
            />
        </View>
    </View>
  )
}

export default FormField