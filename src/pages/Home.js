import React,{useEffect} from 'react'
import {MDBCol,
MDBContainer,
MDBRow,
MDBTypography,
} from "mdb-react-ui-kit"
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-dom"
import { getMemory } from '../redux/features/memorySlice'
import CardMemory from '../components/CardMemory'

const Home = () => {
  const dispatch = useDispatch();
  const {memories,loading} = useSelector((state) => ({...state.memory,}));



useEffect(() => {
  dispatch(getMemory());
},[])





  return (
    <div style={
      {
        margin:"auto",
        padding:"15px",
        maxWidth:"1000px",
        alignContent:"center"
      }
    }>

      <MDBRow className='mt-5'>
        {memories.length === 0 && (
          <MDBTypography className='text-center mb-8' tag="h2"> No Memories Found
            </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
            {memories && memories.map((item,index) => console.log(item,index))}
            {memories && memories.map((item,index) => <CardMemory key={index} {...item}/>)}

            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home