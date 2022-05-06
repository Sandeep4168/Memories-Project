import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const login = createAsyncThunk("auth/login",async({formValue,navigate,toast}) => {
    try{
        const response= await api.signIn(formValue);
        toast.success("Login Successfully");
        navigate("/");
        return response.data;

    }catch(err){
        console.log(err)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false
    },
    extraReducers:{
        [login.pending]: (state,action) => {
            state.loading = true
        },
        [login.fulfilled] : (state,action) => {
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

export default authSlice.reducer;