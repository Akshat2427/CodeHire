import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  savedCourses: [], // Array of objects like { c_id: "course123" }
  loading: false,
  error: null,
};

// Async thunk: Fetch saved courses
export const fetchSavedCourses = createAsyncThunk(
  "saved_course/fetchSavedCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token_codehire"); // or get from auth state
      const response = await axios.get("http://localhost:8080/user/saved-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response.data)
      // Assuming backend sends: ["courseId1", "courseId2"]
    //   console.log(response.data);
      return response.data.map((id) => ({ c_id: id }));
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch saved courses");
    }
  }
);

// Async thunk: Save a course
export const saveCourseToBackend = createAsyncThunk(
  "saved_course/saveCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token_codehire");
      const response = await axios.post(
        `http://localhost:8080/user/save-course/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // or response.data if you return course object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save course");
    }
  }
);

// Slice
const savedCoursesSlice = createSlice({
  name: "saved_course_thunk",
  initialState,
  reducers: {
    // Optional: unsave course locally
    unSaveCourse: (state, action) => {
      state.savedCourses = state.savedCourses.filter(
        (course) => course.c_id !== action.payload.c_id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.savedCourses = action.payload;
      })
      .addCase(fetchSavedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCourseToBackend.fulfilled, (state, action) => {
        const existingCourse = state.savedCourses.find(
          (course) => course.c_id === action.payload.c_id
        );
        if (!existingCourse) {
          state.savedCourses.push(action.payload);
        }
      })
      .addCase(saveCourseToBackend.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exports
export const { unSaveCourse } = savedCoursesSlice.actions;
export default savedCoursesSlice.reducer;
