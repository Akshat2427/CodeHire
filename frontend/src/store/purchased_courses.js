import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPurchasedCourses = createAsyncThunk(
  "purchasedCourses/fetchPurchasedCourses",
  async (_,thunkAPI)=>{
    const token = localStorage.getItem("token_codehire");
    const response = await axios.get('http://localhost:8080/user/my-courses',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
)

const initialState = {
  purchasedCourses: [],
  loading:false,
  error: null,
};

const purchasedCoursesSlice = createSlice({
  name: "purchased_course",
  initialState,
  reducers: {
    purchaseCourse: (state, action) => {
      const existingCourse = state.purchasedCourses.find(course => course.c_id === action.payload);
      if (!existingCourse) {
        state.purchasedCourses.push(action.payload); 
      }
      console.log("state.purchasedCourses", JSON.parse(JSON.stringify(state.purchasedCourses))); 
    },
    
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchPurchasedCourses.pending, (state)=>{
      state.loading = true;
    })
    .addCase(fetchPurchasedCourses.fulfilled, (state,action)=>{
      state.loading = false;
      state.purchasedCourses = action.payload;
    })
    .addCase(fetchPurchasedCourses.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    });
}});

export const { purchaseCourse } = purchasedCoursesSlice.actions;
export default purchasedCoursesSlice.reducer;
