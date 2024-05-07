import { supabase } from "./supabase";

// export const deleteSubjectsForCourse = async (courseId) => {
//   try {
//     // Delete subjects associated with the courseId
//     const { data, error } = await supabase
//       .from("subjects")
//       .delete()
//       .eq("course_id", courseId);

//     var message = null
//     if (error) {
//         message = "Error in deleting Course"
//         return {message}
//       }
//       message = "Successfully Deleted"
//       return {messsage};
//     } catch (error) {
//       message = "Error in deleting Course"
//       return {message}
//     }
// };
  
export const deleteCourseById = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .delete()
      .eq("id", courseId);
    var message = null
    if (error) {
      message = "Error in deleting Course"
      return {message}
    }
    message = "Successfully Deleted"
    return {messsage};
  } catch (error) {
    message = "Error in deleting Course"
    return {message}
  }
};