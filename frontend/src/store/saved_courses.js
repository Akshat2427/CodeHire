import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedCourses: [{id:24}],
};

const savedCoursesSlice = createSlice({
  name: "saved_course",
  initialState,
  reducers: {
    saveCourse: (state, action) => {
      const existingCourse = state.savedCourses.find(course => course.id === action.payload.id);
      if (!existingCourse) {
        state.savedCourses.push(action.payload); 
      }
      console.log("state.savedCourses", JSON.parse(JSON.stringify(state.savedCourses))); 
    },
    unSaveCourse: (state, action) => {
      state.savedCourses = state.savedCourses.filter(
        (course) => course.id !== action.payload.id
      );
    },
  },
});

export const { saveCourse, unSaveCourse } = savedCoursesSlice.actions;
export default savedCoursesSlice.reducer;
