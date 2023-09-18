import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading:false,
    signupData:null,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData:(state,action)=>{
            const data = action.payload
            state.signupData = data
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        }
    }
})

export const {setSignupData,setLoading,setToken} = authSlice.actions

export default authSlice.reducer