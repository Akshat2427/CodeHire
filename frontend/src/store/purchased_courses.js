import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchasedCourses: [{c_id:101} ],
};

const purchasedCoursesSlice = createSlice({
  name: "purchased_course",
  initialState,
  reducers: {
    purchaseCourse: (state, action) => {
      const existingCourse = state.purchasedCourses.find(course => course.c_id === action.payload.c_id);
      if (!existingCourse) {
        state.purchasedCourses.push(action.payload); 
      }
      console.log("state.purchasedCourses", JSON.parse(JSON.stringify(state.purchasedCourses))); 
    },
    
  },
});

export const { purchaseCourse } = purchasedCoursesSlice.actions;
export default purchasedCoursesSlice.reducer;
