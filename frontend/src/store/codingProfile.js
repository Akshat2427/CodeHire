import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for fetching solved problems from LeetCode
export const fetchSolvedProblems = createAsyncThunk(
    "profile/fetchSolvedProblems",
    async (leetcodeUser) => {
        const solvedSet = new Set();
        try {
            const response = await fetch("http://localhost:8080/leetcode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: leetcodeUser }),
            });

            const data = await response.json();

            data.data.recentSubmissionList.forEach(sub => {
                solvedSet.add(sub.title);
            });
            console.log("Solved Set:", solvedSet);

        } catch (error) {
            console.error("Error fetching LeetCode data:", error);
        }
        return Array.from(solvedSet); // Convert Set to an Array before returning
    }
);

// Initial State
const initialState = {
    profile: {
        leetcode: "akvashisht24",
        gfg: "",
        ninja: "",
    },
    solvedQuestions: [], // Initialize as an empty array
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

// Redux Slice
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileUpdated: (state, action) => {
            state.profile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSolvedProblems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSolvedProblems.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.solvedQuestions = action.payload;
            })
            .addCase(fetchSolvedProblems.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { profileUpdated } = profileSlice.actions;
export default profileSlice.reducer;
