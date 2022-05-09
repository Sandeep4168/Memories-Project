import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../api"



export const createMemory = createAsyncThunk("memory/createMemory",async({updatedMemoryData,navigate,toast}) => {
    try{
        const response= await api.createMemory(updatedMemoryData);
        toast.success("Memory created Successfully");
        navigate("/");
        return response.data;

    }catch(err){
        console.log(err)
    }
})

const memorySlice = createSlice({
    name:"memory",
    initialState:{
        memory:{},
        memories:[],
        userMemories:[],
        error:"",
        loading:false
    },
    
    extraReducers:{
        [createMemory.pending]: (state,action) => {
            state.loading = true
        },
        [createMemory.fulfilled] : (state,action) => {
            state.loading = false;
            state.memories = [action.payload];
        },
        [createMemory.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        
    }
});

export default memorySlice.reducer