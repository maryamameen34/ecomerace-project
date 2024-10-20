import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// load logged in user
export const loadLoggedinUser = () => async(dispatch) => {
    try {
        dispatch({
            type : "LoadUserRequest"
        })
        const  {data } = await axios.get("http://localhost:8000/api/get-auth-user" , {withCredentials: true})
        dispatch({
            type : "LoadUserSuccess" ,
            payload : data.user
        })
    } catch (error) {
        dispatch({
            type : "LoadUserFail" ,
            payload : error.response.data.message
        })
    }
} 


// Logout User Action
export const logoutUser = createAsyncThunk('user/logout', async () => {
    const response = await axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true });
    return response.data; // Return any data needed for the reducer
});
