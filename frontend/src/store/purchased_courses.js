import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchasedCourses: [{id:1} ],
};

const purchasedCoursesSlice = createSlice({
  name: "purchased_course",
  initialState,
  reducers: {
    purchaseCourse: (state, action) => {
      const existingCourse = state.purchasedCourses.find(course => course.id === action.payload.id);
      if (!existingCourse) {
        state.purchasedCourses.push(action.payload); 
      }
      console.log("state.purchasedCourses", JSON.parse(JSON.stringify(state.purchasedCourses))); 
    },
    
  },
});

export const { purchaseCourse } = purchasedCoursesSlice.actions;
export default purchasedCoursesSlice.reducer;
