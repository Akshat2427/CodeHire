import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedule: [
    { 
      id: 1, 
      task: "UI Session", 
      time: "9:08 PM", 
      icon: "LayoutDashboard",  
      startTime: "2025-03-14T21:08:00", 
      endTime: "2025-03-14T22:00:00" 
    },
    { 
      id: 2, 
      task: "Typography", 
      time: "10:00 AM", 
      icon: "Brush",  
      startTime: "2025-03-11T10:00:00", 
      endTime: "2025-03-11T10:45:00" 
    },
    { 
      id: 3, 
      task: "React Workshop", 
      time: "11:30 AM", 
      icon: "Code",  
      startTime: "2025-03-14T11:30:00", 
      endTime: "2025-03-14T12:30:00" 
    },
    { 
      id: 4, 
      task: "Java Study", 
      time: "12:45 PM", 
      icon: "BookOpen",  
      startTime: "2025-03-19T12:45:00", 
      endTime: "2025-03-19T13:45:00" 
    },
    { 
      id: 5, 
      task: "Video Editing", 
      time: "2:00 PM", 
      icon: "Video",  
      startTime: "2025-03-17T14:00:00", 
      endTime: "2025-03-17T15:00:00" 
    },
    { 
      id: 6, 
      task: "Essay Writing", 
      time: "3:30 PM", 
      icon: "Edit",  
      startTime: "2025-03-14T15:30:00", 
      endTime: "2025-03-14T16:15:00" 
    },
    { 
      id: 7, 
      task: "Interview Prep", 
      time: "5:00 PM", 
      icon: "FileText",  
      startTime: "2025-03-17T17:00:00", 
      endTime: "2025-03-17T18:00:00" 
    },
    { 
      id: 8, 
      task: "Linux Commands", 
      time: "6:15 PM", 
      icon: "Terminal",   
      startTime: "2025-03-15T18:15:00", 
      endTime: "2025-03-15T19:00:00" 
    },
    { 
      id: 9, 
      task: "Podcast Recording", 
      time: "8:00 PM", 
      icon: "Mic",  
      startTime: "2025-03-11T20:00:00", 
      endTime: "2025-03-11T21:00:00" 
    }
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
