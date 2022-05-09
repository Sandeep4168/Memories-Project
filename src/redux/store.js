import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "./features/authSlice"
import MemoryReducer from "./features/memorySlice"


export default configureStore({
    reducer:{
       auth:AuthReducer,
       memory:MemoryReducer, 
    }
})

