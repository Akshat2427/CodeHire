import { configureStore } from "@reduxjs/toolkit";
import user from "./user"; 
import savedCourses from "./saved_courses";
import schedule from "./schedule";
import  metaInfo  from "./metaInfo";
import codingProfile from "./codingProfile";
import  purchaseCourse  from "./purchased_courses";

const store = configureStore({
  reducer: {
    user: user, 
    savedCourses: savedCourses,
    schedule: schedule,
    metaInfo: metaInfo,
    codingProfile: codingProfile,
    purchasedCourses: purchaseCourse,

  },
});

export default store;
