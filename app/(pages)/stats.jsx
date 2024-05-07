import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../_layout";
import { fetchAttendanceData } from "../../lib/retrieveData";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const stats = () => {
  const [subject, setSubject] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const { data, setData } = useContext(DataContext);
  const [markedDate, setMarkedDate] = useState({});

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    setSubject(data);
    if (data && data.id) {
      fetchAttendanceData(data).then(({ message, data }) => {
        if (message === "Successful") {
          setSubjectData(data);
          let totalClasses = data.length;
          let totalAbsences = data.filter(
            (item) => !item.attendance_status
          ).length;
          let totalPresences = data.filter(
            (item) => item.attendance_status
          ).length;
          setAttendance({
            total: totalClasses,
            absent: totalAbsences,
            present: totalPresences,
          });

          const markedDates = {};
          data.forEach((item) => {
            markedDates[item.date] = {
              selected: true,
              selectedColor: item.attendance_status ? "green" : "red",
            };
          });
          setMarkedDate(markedDates);
        } else {
          Alert.alert("Error", message);
        }
      });
    }
  }, [data]);

  return (
    <SafeAreaView className="p-4 flex-1 justify-start items-start h-full w-full bg-gray-950">
      <View>
        <Text className="text-2xl text-orange-500 font-extrabold">
          {subject !== null ? subject.sub_name : ""} Stats
        </Text>
      </View>
      <ScrollView className="w-full h-full">
        <View className="mt-7">
          <View className="flex flex-col">
            <View className="flex flex-row items-center justify-center my-1 mx-2">
              <Text className="mr-1 text-white text-center font-semibold w-[50%] px-6 py-4 bg-green-600 rounded-[10px]">
                PRESENT: {attendance?.present}
              </Text>
              <Text className="ml-1 text-white text-center font-semibold w-[50%] px-6 py-4 bg-red-600 rounded-[10px]">
                ABSENT: {attendance?.absent}
              </Text>
            </View>
            <View className="items-center justify-center my-1 mx-1">
              <Text className="text-white text-center font-semibold w-full px-6 py-4 bg-gray-600 rounded-[10px]">
                TOTAL: {attendance?.total}
              </Text>
            </View>
          </View>
          <Calendar
            className="w-full rounded-[10px] border-2 border-gray-600 mt-4"
            theme={{
              backgroundColor: "#030712",
              calendarBackground: "#030712",
              monthTextColor: "orange",
              dayTextColor: "lightblue",
              todayTextColor: "yellow",
            }}
            markedDates={markedDate}
          />
          <View className="w-full rounded-[10px] border-2 border-gray-600 mt-4">
            {attendance && (
              <PieChart
                data={[
                  {
                    name: "Present",
                    population: attendance?.present || 0,
                    color: "rgba(22, 163, 74, 1)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Absent",
                    population: attendance?.absent || 0,
                    color: "rgba(220, 38, 38, 1)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                ]}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default stats;
