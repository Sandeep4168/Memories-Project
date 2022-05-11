import React,{useEffect} from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn,
  } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment"
import { getSingleMemory } from '../redux/features/memorySlice';

const SingleMemory = () => {

const dispatch = useDispatch();
const memory = useSelector((state) => ({...state.memory.memory}))
const {id} = useParams();

useEffect(() => {
    if(id){
        dispatch(getSingleMemory(id))
    }
},[id])




  return (
    <>
    <MDBContainer >
        {console.log(memory)}
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage
            position='top'
            style={{
                width: '100%',
                maxheight:"300px"
            }}
            src={memory?.imageFile}
            alt={memory?.title}/>
            <MDBCardBody>
                <h3>{memory.title}</h3>
                <span>
                    <p className='text-start tourName'> Created By: {memory.name}</p>
                </span>
                <div
                style={{float:"left"}}>
                    <span className='text-start'>
                        {memory && memory.tags && memory.tags.map((item) => `#${item} `)}

                    </span>
                </div>
                <br />
                <MDBCardText className='mt-2 text-start'>
                    <MDBIcon
                    style={{float:"left",margin:"5px"}}
                    far
                    icon='calendar-alt'
                    size='lg'
                    />
                    <small className="text-muted">
                        {moment(memory.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className="lead mb-0 text-start">
              {memory.description}
            </MDBCardText>
            </MDBCardBody>
        </MDBCard>

    </MDBContainer>
    </>
  )
}

export default SingleMemory