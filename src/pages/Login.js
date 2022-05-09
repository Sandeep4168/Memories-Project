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
import { login,googleSignIn } from '../redux/features/authSlice'
import {GoogleLogin } from "react-google-login"


const initialState = {
  email:"",
  password:""
}

const Login = () => {

  const [formValue,setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const {email,password} = formValue;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password){
      dispatch(login({formValue,navigate,toast}))
    }
  };

  // const googleSuccess = (resp) => {
  //   const email = resp?.profileObj?.email;
  //   const name = resp?.profileObj?.name;
  //   const token = resp?.tokenId;
  //   const googleId = resp?.googleId;
  //   const result = { email, name, token, googleId };
  //   console.log(resp)
  //   dispatch(googleSignIn({ result, navigate, toast }));
  // };

  // const googleFailure = (error) => {
  //   toast.error(error);
  // };

  const googleSuccess = (resp) => {
    console.log(resp);
  }
  const googleFailure = (err) => {
    toast.error(err);
  }

  const responseGoogle = response => {
    console.log(response);
  };


  const onInputChange = (e) => {
    let {name,value} = e.target
    setFormValue({...formValue,[name]:value});
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
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
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