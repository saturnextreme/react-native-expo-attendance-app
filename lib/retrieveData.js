import { supabase } from './supabase';

export const useProfileData = async (sessionID) => {
    try {
        const { data: userData, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("id", sessionID)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        return {
            username: userData.username,
            email: userData.email,
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export const verifyUser = async (form) => {
    try {
        const { data: userData, error: fetchError } = await supabase
            .from("users")
            .select("id")
            .eq("email", form.email)
            .eq("password", form.password)
            .single();
        
        if (fetchError) {
            return { message: "Unsuccessful", data: fetchError };
        }

        return { message: "Successful", data: userData };
    } catch (error) {
        return { message: "Unsuccessful", data: error.message };
    }
};

export const getCourses = async (sessionToken) => {
  try {
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('user_id', sessionToken);

    if (error) {
      throw error;
    }

    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    return null;
  }
};

export const getSubjectsForCourse = async (courseId) => {
    try {
      const { data: subjects, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('course_id', courseId);
  
      if (error) {
        throw error;
      }
  
      return subjects;
    } catch (error) {
      console.error('Error fetching subjects for course:', error.message);
      return null;
    }
  };
  

  export const fetchAttendanceData = async (form) => {
    try {
        const { data: attendanceData, error: fetchError } = await supabase
            .from("attendance")
            .select("*")
            .eq("sub_id", form.id);
        
        if (fetchError) {
            return { message: "Unsuccessful", data: fetchError };
        }

        return { message: "Successful", data: attendanceData };
    } catch (error) {
        return { message: "Unsuccessful", data: error.message };
    }
};

