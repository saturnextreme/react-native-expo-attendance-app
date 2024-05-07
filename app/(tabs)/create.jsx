import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "./_layout";
import FormField from "../../components/formfield";
import Adder from "../../components/adder";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import Button from "../../components/button";
import { addCourse } from "../../lib/storeData";
import { router } from "expo-router";

const Create = () => {
  const { session, setSession } = useContext(MyContext);
  const [subject, setSubject] = useState();

  const [courseDetails, setCourseDetails] = useState({
    sessionToken: "",
    courseName: "",
    subjectCount: 0,
    subjectName: [],
  });

  useEffect(() => {
    setCourseDetails({ ...courseDetails, sessionToken: session });
  }, [session]);

  const handleRemoveSubject = (index) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      subjectCount: prevState.subjectCount - 1,
      subjectName: prevState.subjectName.filter((_, i) => i !== index),
    }));
  };

  const addCourseDetail = async () => {
    try {
      const { message } = await addCourse(courseDetails);
      console.log(message);
      if (message) {
        Alert.alert("Message of storage", message);
        setCourseDetails({
          sessionToken: session,
          courseName: "",
          subjectCount: 0,
          subjectName: [],
        });
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Error", "Error occured while storing");
    }
  };

  return (
    <SafeAreaView className="p-7 flex-1 justify-start items-start h-full w-full bg-gray-950">
      <Text className="text-2xl text-orange-500 font-extrabold">
        Add a Course
      </Text>
      <ScrollView className="w-full">
        <FormField
          title="Course Name"
          value={courseDetails.courseName}
          handleChangeText={(e) =>
            setCourseDetails({ ...courseDetails, courseName: e })
          }
          otherStyles={"mt-5 py-1"}
        />
        <Adder
          title="Add Subjects"
          value={subject}
          handleChangeText={(e) => {
            setSubject(e);
          }}
          handlePress={() => {
            if (subject != "") {
              setCourseDetails((prevState) => ({
                ...prevState,
                subjectCount: prevState.subjectCount + 1,
                subjectName: [...prevState.subjectName, subject],
              }));
              setSubject("");
            }
          }}
          otherStyles={"mt-5 py-1"}
        />
        {courseDetails.subjectCount != 0 ? (
          <View className="bg-gray-800 p-4 w-full h-auto max-h-[250px] rounded-[10px] mt-4">
            <ScrollView>
              {courseDetails.subjectName.map((subject, index) => (
                <View
                  key={index + "A"}
                  className="w-full h-16 px-2 pr-0 my-2 bg-gray-900 rounded-[10px] border-black-200 flex flex-row items-center"
                >
                  <Text
                    key={index}
                    className="text-white bg-gray-900 flex-1 p-4 h-auto rounded-[10px]"
                  >
                    {subject}
                  </Text>
                  <TouchableOpacity
                    key={index + "B"}
                    onPress={() => handleRemoveSubject(index)}
                    activeOpacity={0.7}
                    className={`rounded-[10px] h-full flex flex-row justify-center items-center p-4`}
                  >
                    <Icon
                      key={index + "C"}
                      name={"crosshairs"}
                      size={20}
                      color={"#AA0000"}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <></>
        )}
        <Button
          title="Add Course"
          handlePress={() => {
            if (
              courseDetails.courseName != "" &&
              courseDetails.subjectCount != 0
            ) {
              addCourseDetail();
            } else {
              Alert.alert(
                "Unfilled Data",
                "Fill up both course name and atleast one subject field."
              );
            }
          }}
          containerStyles="w-full mt-7 bg-orange-700"
          textStyles="text-white"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
