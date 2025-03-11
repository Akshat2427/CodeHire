import { configureStore } from "@reduxjs/toolkit";
import user from "./user"; 
import savedCourses from "./saved_courses";
import schedule from "./schedule";
import  metaInfo  from "./metaInfo";

const store = configureStore({
  reducer: {
    user: user, 
    savedCourses: savedCourses,
    schedule: schedule,
    metaInfo: metaInfo,

  },
});

export default store;
