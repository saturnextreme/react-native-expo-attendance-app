import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({
    title,
    handlePress,
    containerStyles,
    isLoading,
    textStyles
}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`rounded-[200px] h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
            isLoading ? "opacity-50" : ""
          }`}
        disabled={isLoading}
    >
     <Text className={`text-white font-bold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button