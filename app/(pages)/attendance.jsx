import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../_layout";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Button from "../../components/button";
import { markAttendance } from "../../lib/storeData";

const Attendance = () => {
  const [subject, setSubject] = useState(null);
  const [markedDate, setMarkedDate] = useState({});
  const [selectedData, setSelectedData] = useState({
    sub_id: null,
    date: null,
    attendance_status: true,
  });
  const { data, setData } = useContext(DataContext);
  useEffect(() => {
    setSubject(data);
    setSelectedData((prevSelectedData) => ({
      ...prevSelectedData,
      sub_id: data.id,
    }));
  }, [data]);

  return (
    <SafeAreaView className="p-7 flex-1 justify-start items-start h-full w-full bg-gray-950">
      <View>
        <Text className="text-2xl text-orange-500 font-extrabold">
          {subject !== null ? subject.sub_name : ""} Attendance
        </Text>
      </View>
      <ScrollView className="w-full h-full">
        <View className="mt-8 w-full p-1 bg-gray-800 rounded-[10px]">
          <Calendar
            className="w-full rounded-[10px]"
            theme={{
              backgroundColor: "#030712",
              calendarBackground: "#030712",
              monthTextColor: "orange",
              dayTextColor: "lightblue",
              todayTextColor: "yellow",
            }}
            markedDates={markedDate}
            onDayPress={(day) => {
              setSelectedData((prevSelectedData) => ({
                ...prevSelectedData,
                date: day.dateString,
              }));
              setMarkedDate((prevMarkedDate) => ({
                [day.dateString]: { selected: true, selectedColor: "#8A2BE2" },
              }));
            }}
          />
        </View>
        <View className="w-full mt-4 p-4 rounded-[10px] bg-gray-950 border-gray-800 border-2">
          <Text className="w-full text-white text-lg font-normal">
            {selectedData.date != null
              ? `Selected Date: ${selectedData.date}`
              : "Select a date from above."}
          </Text>
        </View>
        <View
          className={`flex-col w-full h-auto mt-4 p-4 rounded-[10px] bg-gray-950 border-gray-800 border-2`}
        >
          <TouchableOpacity
            className={`rounded-[10px] my-2 justify-center items-center px-6 py-4 ${
              selectedData.attendance_status
                ? "border-green-500"
                : "border-gray-800"
            } bg-gray-950 border-2`}
            onPress={() =>
              setSelectedData((prevSelectedData) => ({
                ...prevSelectedData,
                attendance_status: true,
              }))
            }
          >
            <Text
              className={`${
                selectedData.attendance_status
                  ? "text-green-500"
                  : "text-gray-700"
              } font-bold`}
            >
              P
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`rounded-[10px] my-2 justify-center items-center px-6 py-4 ${
              selectedData.attendance_status
                ? "border-gray-800"
                : "border-red-500"
            } bg-gray-950 border-2`}
            onPress={() =>
              setSelectedData((prevSelectedData) => ({
                ...prevSelectedData,
                attendance_status: false,
              }))
            }
          >
            <Text
              className={`${
                selectedData.attendance_status
                  ? "text-gray-700"
                  : "text-red-500"
              } font-bold`}
            >
              A
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Mark Attendance"
          handlePress={async () => {
            let { message } = await markAttendance(selectedData);
            if (message == "Attendance marked successfully") {
              Alert.alert("Marked Sucessful", "Attendance marked successfully");
            } else {
              Alert.alert(
                "Marked UnSucessful",
                "Attendance has not been marked successfully"
              );
            }
          }}
          containerStyles="w-full mt-2 bg-orange-700"
          textStyles="text-white"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Attendance;
