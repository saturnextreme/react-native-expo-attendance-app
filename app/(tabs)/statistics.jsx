import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { MyContext } from "./_layout";
import { getCourses, getSubjectsForCourse } from "../../lib/retrieveData";
import RenderItem from "../../components/itembox";
import { useFocusEffect, router } from "expo-router";
import { DataContext } from "../_layout";

const Statistics = () => {
  const { data, setData } = useContext(DataContext);
  const { session, setSession } = useContext(MyContext);
  const [courseData, setCourseData] = useState();
  const [subData, setSubData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  const fetchData = async () => {
    let course = await getCourses(session);
    setCourseData(course);

    const initialVisibility = {};
    course.forEach((courses) => {
      initialVisibility[courses.id] = false;
    });
    setVisible(initialVisibility);
  };

  const fetchSubData = async (item) => {
    let subject = await getSubjectsForCourse(item);
    setSubData(subject);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [session])
  );

  return (
    <SafeAreaView className="px-4 py-7 flex-1 justify-start items-start h-full w-full bg-gray-950">
      <View className="w-full">
        <Text className="text-2xl text-orange-500 font-extrabold">
          Statistics
        </Text>
        <ScrollView
          className="h-full pt-5"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {courseData && courseData.length > 0 ? (
            courseData.map((course, index) => (
              <View
                key={index + "A"}
                className="my-2 bg-gray-800 w-full h-auto rounded-[10px] flex-1 flex-col"
              >
                <TouchableOpacity
                  className="bg-gray-800 w-full h-auto rounded-[10px] flex-1 flex-col"
                  onPress={async () => {
                    await fetchSubData(course.id);
                    setVisible((prevVisible) => ({
                      ...prevVisible,
                      [course.id]: !prevVisible[course.id],
                    }));
                  }}
                >
                  <RenderItem item={course} />
                </TouchableOpacity>
                {visible[course.id] && (
                  <View className="bg-gray-700 w-full h-auto mt-2 rounded-[10px]">
                    {subData && subData.length > 0 ? (
                      subData.map((subject, index) => (
                        <TouchableOpacity
                          className="w-auto h-auto py-2 px-4 rounded-[10px] flex justify-center items-center bg-gray-600 m-2"
                          key={index + "D"}
                          onPress={() => {
                            setData(subject);
                            router.push("stats");
                          }}
                        >
                          <Text className="text-white">{subject.sub_name}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text className="text-white p-2">
                        No subjects available
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))
          ) : (
            <View className="w-full mt-6 p-2 bg-gray-600 rounded-[10px] flex-1 justify-center items-center">
              <Text className="text-white text-lg font-medium">
                No Course Added Yet
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Statistics;
