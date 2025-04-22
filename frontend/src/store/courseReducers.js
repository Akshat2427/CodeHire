import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async ()=>{
    try{
        const response = await axios.get("http://localhost:8080/user/explore-courses");
        // console.log(response.data)
        return response.data;

    } catch(error){
        console.error("Error fetching courses:", error);
    }
})

const coursesSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {0
                state.status = "succeeded";
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default coursesSlice.reducer;
