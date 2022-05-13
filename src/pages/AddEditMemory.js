import React,{useState} from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBSpinner
} from "mdb-react-ui-kit"
import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import {toast} from "react-toastify"
import {Navigate, useNavigate, useParam, useParams} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { createMemory,updateMemory } from '../redux/features/memorySlice'

const initialState = {
    title:"",
    description:"",
    tags:[]

}




const AddEditMemory = () => {

const [memoryData,setMemoryData] = useState(initialState);
const {title,description,tags} = memoryData;
const {id} = useParams();
const {error,loading,userMemories} = useSelector((state) => ({...state.memory}));
const {user} = useSelector((state) => ({...state.auth}));
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
    error && toast.error(error);
},[error])

useEffect(() => {
    if(id){
        const singleMemory = userMemories.find((memory) => (memory._id === id));
        setMemoryData({...singleMemory});
    }
},[id])



const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags){
        const updatedMemoryData = {...memoryData,name: user?.result?.name}
        if(!id){
            dispatch(createMemory({updatedMemoryData,navigate,toast}));
        }else{
            dispatch(updateMemory({id,updatedMemoryData,toast,navigate}))
        }
       
        handleClear();
    }

}
const handleClear = () => {
    setMemoryData({title:"",description:"",tags:[]});
}
const onInputChange = (e) => {
    const {name,value} = e.target;
    setMemoryData({...memoryData,[name]:value})
}
const handleAddTag = (tag) => {
    setMemoryData({...memoryData,tags:[...memoryData.tags,tag]});
}
const handleDeleteTag = (deleteTag) => {
    setMemoryData({...memoryData,tags: memoryData.tags.filter((tag) => tag !== deleteTag)});
}

  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}className="container">
        <MDBCard alignment='center'>
            <h5> {id?"Update Memory" : " Memory"}</h5>
            <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                <div className='col-md-12'>
                    <input placeholder='title'
                     type="text" 
                     value={title}
                      name="title" 
                      onChange={onInputChange} 
                      className="form-control"
                      required
                      invalid={true}
                      validation="Please provide title"
                    />
                </div>
                <div className='col-md-12'>
                    <textarea placeholder='description'
                    style={{height:"100px"}}
                     type="text" 
                     value={description}
                      name="description" 
                      onChange={onInputChange} 
                      className="form-control"
                      required
                      invalid={true}
                      validation="Please provide description"
                    />
                </div>
                <div className='col-md-12'>
                    <ChipInput
                    name="tags"
                    variant='outlined'
                    placeholder='Enter Tag'
                    fullWidth
                    value={tags} 
                    onAdd={(tag) => handleAddTag(tag)}
                    onDelete={(tag) => handleDeleteTag(tag)}
                    />
                </div>
                <div className="d-flex justify-content-start">
                    <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => 
                setMemoryData({...memoryData,imageFile:base64})}/>

                </div>
                <div className='col-12'>
                    <MDBBtn style={{width:"100%"}}> {id? "Update" :"Submit"}</MDBBtn>
                    <MDBBtn style={{width:"100%"}} 
                    className="mt-2" 
                    color='danger'
                    onClick={handleClear}
                    > Clear</MDBBtn>

                </div>
            </MDBValidation>
            </MDBCardBody>
        </MDBCard>

    </div>
  )
}

export default AddEditMemory