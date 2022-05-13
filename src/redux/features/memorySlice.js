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

export const getMemories = createAsyncThunk("memory/getMemories",async(_,{rejectWithValue}) => {
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

export const getMemoriesByUser = createAsyncThunk("memory/getMemoriesByUser",async(userId,{rejectWithValue}) => {
    try{
        const response= await api.getMemoriesByUser(userId);
       
        return response.data;

    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const deleteMemory = createAsyncThunk("memory/deleteMemory",async({id,toast},{rejectWithValue}) => {
    try{
        const response= await api.deleteMemory(id);
       toast.success("Memory deleted successfully")
        return response.data;

    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const updateMemory = createAsyncThunk("memory/updateMemory",async({updatedMemoryData,navigate,id,toast},{rejectWithValue}) => {
    try{
        const response= await api.updateMemory(id,updatedMemoryData);
       toast.success("Memory updated successfully")
       navigate("/")
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
        [getMemories.pending]: (state,action) => {
            state.loading = true
        },
        [getMemories.fulfilled] : (state,action) => {
            state.loading = false;
            state.memories = action.payload;
        },
        [getMemories.rejected]:(state,action) => {
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
        [getMemoriesByUser.pending]: (state,action) => {
            state.loading = true
        },
        [getMemoriesByUser.fulfilled] : (state,action) => {
            state.loading = false;
            state.userMemories = action.payload;
        },
        [getMemoriesByUser.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteMemory.pending]: (state,action) => {
            state.loading = true
        },
        [deleteMemory.fulfilled] : (state,action) => {
            state.loading = false;
            console.log("action",action)
            const {arg:{id}} = action.meta;
            if(id){
                state.userMemories = state.userMemories.filter((item) => (item._id !== id))
                state.memories = state.memories.filter((item) => (item._id !== id))
            }
        },
        [deleteMemory.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateMemory.pending]: (state,action) => {
            state.loading = true
        },
        [updateMemory.fulfilled] : (state,action) => {
            state.loading = false;
            console.log("action",action)
            const {arg:{id}} = action.meta;
            if(id){
                state.userMemories = state.userMemories.map((item) => (item._id === id ? action.payload:item))
                state.memories = state.memories.map((item) => (item._id === id ? action.payload : item))
            }
        },
        [updateMemory.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        
    }
});

export default memorySlice.reducer