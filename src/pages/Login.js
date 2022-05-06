import React,{useState,useEffect} from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBFooter
} from "mdb-react-ui-kit"
import {Link,useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import {toast} from "react-toastify"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../redux/features/authSlice'


const initialState = {
  email:"",
  password:""
}

const Login = () => {

  const [formValue,setFormValue] = useState(initialState);

  const {email,password} = formValue;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password){
      dispatch(login({formValue,navigate,toast}))
    }
  };


  const onInputChange = (e) => {
    let {name,value} = e.target;
    console.log(name,value);
    setFormValue({...formValue,[name]:value});
    console.log({...formValue,[name]:value})
  };

  return (

    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}>
      <MDBCard alignment="center">
        <MDBIcon fas icon ="user-circle" className="fa-zx"/>
        <h5> Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className = "col-ms-22">
              <MDBInput label="email"
              type="email"
              value={email}
              name="email"
              onChange={onInputChange}
              required
              invalid
              validation="Please provide your email"/>
            </div>
            <div className = "col-ms-22">
              <MDBInput label="password"
              type="password"
              value={password}
              name="password"
              onChange={onInputChange}
              required
              invalid
              validation="Please provide your password"/>
            </div>
            <div>
              <MDBBtn style={{width:"100%"}} className="mt-2">
                Login
              </MDBBtn>
            </div>

          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
          <p>Don't have an account? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>


    </div>
  )
}

export default Login