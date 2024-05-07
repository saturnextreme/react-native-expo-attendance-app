import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Adder = ({
  title,
  value,
  otherStyles,
  placeholder,
  handleChangeText,
  handlePress,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-medium">{title}</Text>
      <View className="w-full h-16 px-4 pr-0 bg-gray-900 rounded-2xl border-black-200 flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-semibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          {...props}
        />
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          className={`rounded-2xl h-full flex flex-row justify-center items-center p-4`}
        >
            <Icon name={'plus-square-o'} size={20} color={'#A9A9A9'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Adder;
