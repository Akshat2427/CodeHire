import { configureStore } from "@reduxjs/toolkit";
import user from "./user"; 
import savedCourses from "./saved_courses";
import schedule from "./schedule";
import  metaInfo  from "./metaInfo";
import codingProfile from "./codingProfile";
import  purchaseCourse  from "./purchased_courses";
import ui_store from "./ui_store";
import coursesSlice from "./courseReducers";

const store = configureStore({
  reducer: {
    user: user, 
    savedCourses: savedCourses,
    schedule: schedule,
    metaInfo: metaInfo,
    codingProfile: codingProfile,
    purchasedCourses: purchaseCourse,
    ui_store: ui_store,
    courses: coursesSlice,


  },
});

export default store;
