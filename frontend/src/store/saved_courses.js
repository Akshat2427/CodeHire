import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  savedCourses: [{c_id:""}],
};

const savedCoursesSlice = createSlice({
  name: "saved_course",
  initialState,
  reducers: {
    saveCourse: (state, action) => {
      // console.log(action.payload);
      const existingCourse = state.savedCourses.find(course => course.c_id === action.payload.c_id);
      if (!existingCourse) {
        state.savedCourses.push(action.payload); 
      }
      console.log(JSON.parse(JSON.stringify(state.savedCourses)));
      // console.log("state.savedCourses", JSON.parse(JSON.stringify(state.savedCourses))); 
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
