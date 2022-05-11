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

export const getMemory = createAsyncThunk("memory/getMemory",async(_,{rejectWithValue}) => {
    try{
        const response= await api.getMemories();
       
        return response.data;

    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getSingleMemory = createAsyncThunk("memory/getSingleMemory",async(id,{rejectWithValue}) => {
    try{
        const response= await api.getMemory(id);
       
        return response.data;

    }catch(err){
        return rejectWithValue(err.response.data);
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
        [getMemory.pending]: (state,action) => {
            state.loading = true
        },
        [getMemory.fulfilled] : (state,action) => {
            state.loading = false;
            state.memories = action.payload;
        },
        [getMemory.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getSingleMemory.pending]: (state,action) => {
            state.loading = true
        },
        [getSingleMemory.fulfilled] : (state,action) => {
            state.loading = false;
            state.memory = action.payload;
        },
        [getSingleMemory.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        
    }
});

export default memorySlice.reducer