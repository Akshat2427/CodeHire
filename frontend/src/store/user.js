import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 1,
    username: "Anshul Chaudhary",
    email: "anshul1070.be22@chitkarauniversity.edu.in",
    role: "student",
    imgUrl : "./images/AnshulPhoto_2.jpg"
  },
  isAuthenticated: false,
  token:  null,    

  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Login Action:", action.payload);
        const userToken = action.payload?.token || null;
        action.payload = action.payload?.user ;
        state.user.id = action.payload?.id || 0;
        state.user.username = action.payload?.name || "User";
        state.user.email = action.payload?.email ;
        state.user.role = action.payload?.role;
        state.user.imgUrl = action.payload?.imgUrl || "./images/pfp.jpg";
        console.log('====================================');
        console.log(state.user);
        console.log('====================================');    
        state.isAuthenticated = true;
        state.token = userToken;
        
      
    },
    logout: (state) => {
      state.user = null;
        state.isAuthenticated = false;
     
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
