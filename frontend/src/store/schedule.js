import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedule: [
    { id: 1, task: "UI Session", time: "9:08 PM", icon: "LayoutDashboard" },
    { id: 2, task: "Typography", time: "10:00 AM", icon: "Brush" },
    { id: 3, task: "React Workshop", time: "11:30 AM", icon: "Code" },
    { id: 4, task: "Java Study", time: "12:45 PM", icon: "BookOpen" },
    { id: 5, task: "Video Editing", time: "2:00 PM", icon: "Video" },
    { id: 6, task: "Essay Writing", time: "3:30 PM", icon: "Edit" },
    { id: 7, task: "Interview Prep", time: "5:00 PM", icon: "FileText" },
    { id: 8, task: "Linux Commands", time: "6:15 PM", icon: "Terminal" },
    { id: 9, task: "Podcast Recording", time: "8:00 PM", icon: "Mic" }
  ],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addEventInSchedule: (state, action) => {
      state.schedule.push(action.payload);
    },
    deleteEventInSchedule: (state, action) => {
      state.schedule = state.schedule.filter(event => event.id !== action.payload.id);
    }
  }
});

export const { addEventInSchedule, deleteEventInSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
