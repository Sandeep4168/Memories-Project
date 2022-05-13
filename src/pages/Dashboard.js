import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBCardGroup,
  } from "mdb-react-ui-kit";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import { toast } from "react-toastify";
import { getMemories, getMemoriesByUser,deleteMemory } from "../redux/features/memorySlice";
import Spinner from "../components/Spinner";

const Dashboard = () => {
const {user} = useSelector((state) => ({...state.auth}));
const {userMemories,loading} = useSelector((state) => ({...state.memory}))

const userId = user?.result?._id;
const dispatch = useDispatch();

useEffect(() => {
    if(userId){
        dispatch(getMemoriesByUser(userId));
    }

},[userId])

const excerpt = (str) => {
    if (str.length > 70) {
      str = str.substring(0, 70) + " ...";
    }
    return str;
  };

  if (loading){
      return <Spinner/>
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteMemory({ id, toast }));
    }
  };


  return (
    <div 
    style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "1200px",
        alignContent: "center",
      }}
    >
        {userMemories.length === 0 && (
            <>
        <h3>Hi! {user?.result?.name}, No Memories? Why not add one</h3>
        <Link to="/addMemory">
           <h5>Add a memory</h5> 
        </Link>
        </>
      )}

      {userMemories.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {userMemories &&
        userMemories.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "900px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      
                      <Link to={`/editMemory/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                      <MDBBtn className="mt-1 " tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" , marginLeft: "10px" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  )
}

export default Dashboard