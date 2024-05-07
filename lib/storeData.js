import { supabase } from "./supabase";

export const signUpUser = async (form) => {
    try {
        const { data: existingEmail, error: emailError } = await supabase
            .from("users")
            .select("email")
            .eq("email", form.email)
            .single();
            if (existingEmail !== null) {
                return { message: "Unsuccessful", data: "Try with different email" }; 
            }
    } catch (error) {
        return { message: "Unsuccessful", error: "Try with different email" }; 
    } 
    try {
        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                },
            ]);
        const { data: userData, error: fetchError } = await supabase
            .from("users")
            .select("id")
            .eq("email", form.email)
            .single();
            return { message: "Successful", data: userData };
    } catch (error) {
        return { message: "Unsuccessful", error: "Error while inserting data" };
    }
};



export const addCourse = async (courseDetails) => {
    const { sessionToken, courseName, subjectCount, subjectName } = courseDetails;
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([{ 
            user_id: sessionToken, 
            course_name: courseName, 
            subject_count: subjectCount }]);
      const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq("course_name", courseName)
      .single()
      const courseId = courseData.id;
      var {message} = await addSubjects(courseId, subjectName)

      if (message) {
        message = `Course and ${message}`
        return { message }
      }
    } catch (error) {
        const message = 'Error adding course:'
      return { message };
    }
  };

  export const addSubjects = async (courseId, subjects) => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .insert(subjects.map(subject => ({ 
            course_id: courseId,
            sub_name: subject })));

      const message = 'Subjects added successfully';
      return { message }
    } catch (error) {
       const message = 'Error adding subjects:';
       { message }
    }
  };

  export const markAttendance = async (selectedData) => {
    const { sub_id, date, attendance_status } = selectedData;
    try {
        const { data, error } = await supabase
            .from('attendance')
            .insert([{ 
                sub_id: sub_id, 
                date: date, 
                attendance_status: attendance_status 
            }]);
        if (error) {
            return { message: 'Error marking attendance:', error: error.message };
        } else {
            return { message: 'Attendance marked successfully' };
        }
    } catch (error) {
        return { message: 'Error marking attendance:', error: error.message };
    }
};