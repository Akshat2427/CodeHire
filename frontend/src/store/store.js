import { configureStore } from "@reduxjs/toolkit";
import user from "./user"; 
import schedule from "./schedule";
import  metaInfo  from "./metaInfo";
import codingProfile from "./codingProfile";
import  purchaseCourse  from "./purchased_courses";
import ui_store from "./ui_store";
import coursesSlice from "./courseReducers";
import savedCoursesSlice from "./saveCourseThunk"

const store = configureStore({
  reducer: {
    user: user, 
    schedule: schedule,
    metaInfo: metaInfo,
    codingProfile: codingProfile,
    purchasedCourses: purchaseCourse,
    ui_store: ui_store,
    courses: coursesSlice,
    saved_courses: savedCoursesSlice,
  },
});

export default store;
