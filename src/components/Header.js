import React,{useState} from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from "mdb-react-ui-kit"
import { useSelector,useDispatch } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';



const Header = () => {
  const [show,setShow] = useState(false);
  const [search,setSearch] = useState("");
  const {user} = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <MDBNavbar fixed='top' expand="lg" style={{backgroundColor:"white"}}>
      <MDBContainer>
        <MDBNavbarBrand href="/" 
        style={{color:"#1A3C40", fontWeight:"600",fontSize:"22px"}}>
          Memories
        </MDBNavbarBrand>
        <MDBNavbarToggler
        type="button"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setShow(!show)}
        style={{color:"#1A3C40"}}>
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav fullWidth="false" className='mb-2 mb-lg-0' right >
          <MDBNavbarItem>
            {user?.result?._id && (
              <>
                <p className='header-text' style={{marginTop:"25px"}}> Hi {user?.result?.name}</p>
              </>
            )}
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className='header-text'> Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
              <MDBNavbarItem>
              <MDBNavbarLink href="/addMemory">
                <p className='header-text'> Add Memory</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/dashboard">
                <p className='header-text'> Dashboard</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
              </>
            )}

            {user?.result?._id ? 
            <MDBNavbarItem>
            <MDBNavbarLink href="/login">
              <p className='header-text' onClick={handleLogout}> Logout</p>
            </MDBNavbarLink>
          </MDBNavbarItem>
          :
          <MDBNavbarItem>
              <MDBNavbarLink href="/login">
                <p className='header-text'> Login</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
          }
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header