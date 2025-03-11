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
        const result = action.payload?.user ;
        console.log("ngfhiu" , result);
        state.user.id = result?.id || 0;
        state.user.username = result?.name || "User";
        state.user.email = result?.email ;
        state.user.role = result?.role;
        state.user.imgUrl = result?.imgUrl || "./images/pfp.jpg";
        console.log('====================================');
        console.log(state.user);
        console.log('====================================');    
        state.isAuthenticated = true;
        state.token = userToken;
        
      
    },
    logout: (state ) => {
      const token = state.token
        state.user = {
          id: 1,
          username: "Anshul Chaudhary",
          email: "anshul1070.be22@chitkarauniversity.edu.in",
          role: "student",
          imgUrl : "./images/AnshulPhoto_2.jpg"
        },
        state.isAuthenticated = false;
        localStorage.removeItem("token_codehire")
        fetch("http://localhost:8080/user/logout",{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

     
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
