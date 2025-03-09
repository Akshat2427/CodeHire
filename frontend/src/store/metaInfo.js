import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metaInfo: {
    pageName: "Dashboard",
    },
};

const metaInfoSlice = createSlice({
  name: "metaInfo",
  initialState,
  reducers: {
    pageNameUpdated: (state, action) => {
        state.metaInfo.pageName = action.payload; 
    },
  },
});

export const { pageNameUpdated } = metaInfoSlice.actions;
export default metaInfoSlice.reducer;
