import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

export const signIn = (formData) => API.post("/users/signin",formData)
export const signUp = (formData) => API.post("/users/signup",formData)
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createMemory = (memoryData) => API.post("/memory",memoryData);

export const getMemories = () => API.get("/memory");
export const getMemory = (id) => API.get(`/memory/${id}`);
export const deleteMemory = (id) => API.delete(`/memory/${id}`);
export const updateMemory = (id,updatedMemoryData) => API.patch(`/memory/${id}`,updatedMemoryData);
export const getMemoriesByUser = (userId) => API.get(`/memory/userMemories/${userId}`); 