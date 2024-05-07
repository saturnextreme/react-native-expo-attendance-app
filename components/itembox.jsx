import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";

const RenderItem = ({ item }) => {
  return (
      <View className="bg-gray-800 w-full h-auto rounded-[10px] flex-1 flex-col">
        <View className="flex-1 flex-row items-center bg-gray-900 rounded-t-[10px] p-4">
          <Text className="w-[90%] text-white text-xl font-medium py-1">
            {item.course_name}
          </Text>
          {/* <View className='p-4'>
          <Icon className="w-full h-full" name={"more-vertical"} size={20} color={"#fff"} />
        </View> */}
        </View>
        <Text className="text-orange-400 text-md font-normal px-4 py-2">
          Subject: {item.subject_count}
        </Text>
      </View>
  );
};

export default RenderItem;
