import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null,
        error:null,
    },
    reducers:{
        loginRequest:(state,action) => {},
        loginSuccess:(state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        },
        loginFailure:(state,action) => {
            state.error = action.payload;
        },
        logout:(state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    }
})

export const {loginRequest,loginSuccess,loginFailure,logout} = authSlice.actions;
export default authSlice.reducer;