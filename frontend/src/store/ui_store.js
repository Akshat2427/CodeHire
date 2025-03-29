import { createSlice } from "@reduxjs/toolkit";

const initialState = {
openSidebar : true,
fullscreenSidebar : false,
};

const ui_store = createSlice({
  name: "ui_store",
  initialState,
  reducers: {
    setSideBar: (state, action) => {
        state.openSidebar = action.payload;
    },
    setFullScreenSideBar: (state, action) => {
        state.fullscreenSidebar = action.payload;
    }
   
  },
});

export const { setSideBar , setFullScreenSideBar } = ui_store.actions;
export default ui_store.reducer;
