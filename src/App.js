import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {ToastContainer} from "react-toastify"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditMemory from './pages/AddEditMemory';
import Header from '../../client/src/components/Header'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {setUser} from "../src/redux/features/authSlice"
import SingleMemory from './pages/SingleMemory';
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));

  })
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/addMemory' element={<AddEditMemory/>}/>
          <Route path='/editMemory/:id' element={<AddEditMemory/>}/>
          <Route path='/memory/:id' element={<SingleMemory/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
