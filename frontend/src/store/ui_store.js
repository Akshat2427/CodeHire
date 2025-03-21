import { createSlice } from "@reduxjs/toolkit";

const initialState = {
openSidebar : true,
};

const ui_store = createSlice({
  name: "ui_store",
  initialState,
  reducers: {
    setSideBar: (state, action) => {
        state.openSidebar = action.payload;
    },
   
  },
});

export const { setSideBar } = ui_store.actions;
export default ui_store.reducer;
